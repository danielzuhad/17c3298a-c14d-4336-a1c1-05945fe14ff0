import {
  ColumnDef,
  flexRender,
  Table as TableType,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { User } from "@prisma/client";
import { Controller, UseFormReturn } from "react-hook-form";
import InputTable from "./InputTable";
import { getFormattedInputValue } from "@/utils/formatNumber";

interface DataTableProps {
  table: TableType<User>;
  isLoading?: boolean;
  isAdding: boolean;
  checkEmail: (email: string) => void;
  columns: ColumnDef<{
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    phoneNumber: string;
    email: string;
  }>[];
  methods: UseFormReturn<
    {
      firstName: string;
      lastName: string;
      email: string;
      position: string;
      phoneNumber: string;
    },
    any,
    undefined
  >;
}

const DataTable = ({
  table,
  isLoading,
  isAdding,
  methods,
  columns,
  checkEmail,
}: DataTableProps) => {
  const {
    formState: { errors },
    getFieldState,
  } = methods;

  return (
    <>
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="z-10">
          {isAdding && (
            <TableRow className="hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted">
              <TableCell className="p-0"></TableCell>
              <TableCell className="p-0">
                <Controller
                  name="firstName"
                  control={methods.control}
                  render={({ field }) => (
                    <>
                      <InputTable
                        {...field}
                        error={
                          getFieldState("firstName").error?.message || null
                        }
                        isValidating={getFieldState("firstName").isValidating}
                        type="text"
                        value={field.value || ""}
                        placeholder="First Name"
                        className={`transition-all ${
                          getFieldState("firstName").isDirty && "bg-green-200"
                        } ${errors.firstName && `bg-red-200`}`}
                        onChange={(e) => {
                          field.onChange(e);
                          methods.trigger("firstName");
                        }}
                      />
                    </>
                  )}
                />
              </TableCell>

              <TableCell>
                <Controller
                  name="lastName"
                  control={methods.control}
                  render={({ field }) => (
                    <>
                      <InputTable
                        {...field}
                        error={getFieldState("lastName").error?.message || null}
                        isValidating={getFieldState("lastName").isValidating}
                        type="text"
                        value={field.value || ""}
                        placeholder="Last Name"
                        className={`transition-all ${
                          getFieldState("lastName").isDirty && "bg-green-200"
                        } ${errors.lastName && `bg-red-200`}`}
                        onChange={(e) => {
                          field.onChange(e);
                          methods.trigger("lastName");
                        }}
                      />
                    </>
                  )}
                />
              </TableCell>

              <TableCell>
                <Controller
                  name="email"
                  control={methods.control}
                  render={({ field }) => (
                    <>
                      <InputTable
                        {...field}
                        error={errors.email?.message || null}
                        isValidating={getFieldState("email").isValidating}
                        value={field.value || ""}
                        placeholder="Email"
                        className={`transition-all ${
                          getFieldState("email").isDirty && "bg-green-200"
                        } ${errors.email && `bg-red-200`}`}
                        onChange={(e) => {
                          field.onChange(e);
                          methods.trigger("email").then(() => {
                            checkEmail(e.target.value);
                          });
                        }}
                      />
                    </>
                  )}
                />
              </TableCell>

              <TableCell>
                <Controller
                  name="position"
                  control={methods.control}
                  render={({ field }) => (
                    <>
                      <InputTable
                        {...field}
                        error={getFieldState("position").error?.message || null}
                        isValidating={getFieldState("position").isValidating}
                        type="text"
                        value={field.value || ""}
                        placeholder="Position"
                        className={`transition-all ${
                          getFieldState("position").isDirty && "bg-green-200"
                        } ${errors.position && `bg-red-200`}`}
                        onChange={(e) => {
                          field.onChange(e);
                          methods.trigger("position");
                        }}
                      />
                    </>
                  )}
                />
              </TableCell>

              <TableCell>
                <Controller
                  name="phoneNumber"
                  defaultValue=""
                  control={methods.control}
                  render={({ field }) => (
                    <>
                      <InputTable
                        {...field}
                        error={
                          getFieldState("phoneNumber").error?.message || null
                        }
                        pattern="^(\+)?[0-9\s]*$"
                        isValidating={getFieldState("phoneNumber").isValidating}
                        type="text"
                        placeholder="Number"
                        className={`transition-all ${
                          getFieldState("phoneNumber").isDirty && "bg-green-200"
                        } ${errors.phoneNumber && `bg-red-200`}`}
                        onChange={(e) => {
                          const formattedValue = getFormattedInputValue(
                            e.target.value,
                            field.value
                          );
                          field.onChange(formattedValue);
                          methods.trigger("phoneNumber");
                        }}
                      />
                    </>
                  )}
                />
              </TableCell>
            </TableRow>
          )}

          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow
                key={index}
                className="bg-muted/50 animate-pulse transition-all duration-500"
              >
                <TableCell className="p-2" colSpan={columns.length}>
                  {" "}
                  &nbsp;
                </TableCell>
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="hover:tw-bg-muted/50 z-10 data-[state=selected]:tw-bg-muted"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
