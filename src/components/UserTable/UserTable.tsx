import DataTable from "./DataTable";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import TableAction from "./TableAction";
import useUserTable from "./useUserTable";
import { updateSchema } from "@/schema/formSchema";
import { validateFields } from "@/utils/validateFields";
import toast from "react-hot-toast";
import { columns } from "./columns";
import CellComponent from "./CellTable";
import { User } from "@prisma/client";

type UserUpdate = {
  id: number;
  [key: string]: any;
};

const UserTable = () => {
  const cellValuesRef = useRef<{ id: number; value: any; columnId: string }[]>(
    []
  );

  const {
    methods,
    users,
    isLoading,
    handleDeleteUsers,
    createUserMutation,
    updateUserMutation,
    refetch,
    hanldeIsLoading,
  } = useUserTable();

  const [isAdding, setIsAdding] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const defaultColumn: Partial<ColumnDef<User>> = {
    cell: ({ getValue, row: { original }, column: { id }, table }) => {
      const initialValue = getValue();
      const columnSpecificSchema = updateSchema;

      return (
        <CellComponent
          table={table}
          id={id}
          initialValue={initialValue}
          columnSpecificSchema={columnSpecificSchema}
          cellValuesRef={cellValuesRef}
          originalId={original.id}
        />
      );
    },
  };

  const table = useReactTable({
    data: users || [],
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      rowSelection,
    },
    onPaginationChange: setPagination,
  });

  const checkEmailUnique = (email: string) => {
    const emailExists = users?.some((user) => user.email === email);

    if (emailExists) {
      methods.setError("email", {
        type: "manual",
        message: "Email must be unique",
      });
    }
  };

  useEffect(() => {
    if (!isAdding) {
      methods.reset();
    }
  }, [isAdding]);

  const onSubmit = async () => {
    if (!isAdding && cellValuesRef.current.length > 0) {
      // UPDATE USER

      const groupedData = cellValuesRef.current.reduce<{
        [id: number]: UserUpdate;
      }>((acc, { id, columnId, value }) => {
        if (!acc[id]) {
          acc[id] = { id };
        }

        acc[id][columnId] = value;

        return acc;
      }, {});

      const preparedData = Object.values(groupedData);

      try {
        preparedData.forEach((user) => {
          updateSchema.parse(user);
        });
        await toast.promise(updateUserMutation.mutateAsync(preparedData), {
          loading: "Updating user...",
          success: "User updated successfully",
          error: "Failed to update user",
        });
        await refetch();
        cellValuesRef.current = [];
      } catch (error) {}
    } else {
      // CREATE USER
      validateFields(methods);

      const hasErrors = Object.keys(methods.formState.errors).length > 0;
      if (!hasErrors) {
        try {
          await toast.promise(
            createUserMutation.mutateAsync(methods.getValues()),
            {
              loading: "Creating user...",
              success: "User created successfully",
              error: "Failed to create user",
            }
          );
          await refetch();
          setIsAdding(false);
          methods.reset();
        } catch (error) {
          console.error("Failed to create user: ", error);
        }
      }
    }
  };

  return (
    <>
      <div className="w-full  flex flex-col justify-center items-center container">
        <TableAction
          hanldeIsLoading={hanldeIsLoading}
          onSubmit={onSubmit}
          isAdding={isAdding}
          table={table}
          isLoading={isLoading}
          setIsAdding={setIsAdding}
          handleDeleteUsers={handleDeleteUsers}
        />
        <DataTable
          columns={columns}
          checkEmail={checkEmailUnique}
          methods={methods}
          isAdding={isAdding}
          table={table}
          isLoading={isLoading}
        />
        <Pagination table={table} isLoading={isLoading} />
      </div>
    </>
  );
};

export default UserTable;
