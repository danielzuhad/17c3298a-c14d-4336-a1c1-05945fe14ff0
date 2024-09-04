import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { User } from "@prisma/client";

interface PaginationProps {
  table: Table<User>;
  isLoading?: boolean;
}

const Pagination = ({ table, isLoading }: PaginationProps) => {
  if (isLoading) return null;

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <>
      <div className="w-full z-0 mt-2  flex justify-between ">
        <div className="flex gap-x-1.5 items-center">
          {/* reset */}
          <Button
            onClick={() => table.resetRowSelection()}
            size={"sm"}
            variant={"outline"}
          >
            Reset
          </Button>

          {/* page */}
          <span className="text-xs text-muted-foreground/60 font-medium">
            Page {pageIndex + 1} of {pageCount}
          </span>
        </div>

        {/* button */}
        <div className="flex gap-x-1.5">
          <Button
            onClick={() => table.setPageIndex(pageIndex - 1)}
            disabled={!table.getCanPreviousPage()}
            size={"sm"}
            variant={"outline"}
          >
            Previous
          </Button>

          <Button
            onClick={() => table.setPageIndex(pageIndex + 1)}
            disabled={!table.getCanNextPage()}
            size={"sm"}
            variant={"outline"}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
