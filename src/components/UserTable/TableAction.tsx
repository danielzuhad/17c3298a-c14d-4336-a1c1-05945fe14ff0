import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { CircleCheck, CirclePlus, Trash } from "lucide-react";

interface TableActionProps {
  table: Table<User>;
  isLoading?: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteUsers: (userIds: number[]) => Promise<void>;
  isAdding: boolean;
  onSubmit: () => void;
  hanldeIsLoading: () => boolean;
}

const TableAction = ({
  table,
  isLoading,
  setIsAdding,
  isAdding,
  onSubmit,
  handleDeleteUsers,
  hanldeIsLoading,
}: TableActionProps) => {
  if (isLoading) return null;

  return (
    <>
      <div className="w-full h-max flex items-center mb-1">
        <div className="w-[50%] sm:w-[40%]">
          <Input
            disabled={isAdding || hanldeIsLoading()}
            className="h-8"
            type="search"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            placeholder="search the first name"
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="w-full flex justify-end">
          <Button
            disabled={hanldeIsLoading()}
            className="rounded-full active:bg-muted-foreground/20 transition-all"
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              setIsAdding((prev) => !prev);
            }}
          >
            <CirclePlus
              size={20}
              className="hover:bg-muted-foreground/20 rounded-full"
            />
          </Button>

          <Button
            disabled={hanldeIsLoading()}
            className="rounded-full active:bg-muted-foreground/20 transition-all"
            size={"icon"}
            variant={"ghost"}
            onClick={onSubmit}
          >
            <CircleCheck
              size={20}
              className="hover:bg-muted-foreground/20 rounded-full"
            />
          </Button>

          <Button
            disabled={hanldeIsLoading()}
            className="rounded-full active:bg-muted-foreground/20 transition-all"
            size={"icon"}
            variant={"ghost"}
            onClick={async () => {
              const selectedIds = table
                .getSelectedRowModel()
                .rows.map((row) => row.original.id);
              if (selectedIds.length > 0) {
                await handleDeleteUsers(selectedIds);
                await table.resetRowSelection();
              } else {
                console.warn("No users selected");
              }
            }}
          >
            <Trash
              size={20}
              className="hover:bg-muted-foreground/20 rounded-full"
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TableAction;
