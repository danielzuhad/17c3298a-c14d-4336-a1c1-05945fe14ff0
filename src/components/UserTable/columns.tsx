"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="m-2"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className=""
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();

      return (
        <Button
          className="w-full flex gap-x-2 justify-center items-center"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          {sortDirection === "asc" && <ArrowUp size={14} />}
          {sortDirection === "desc" && <ArrowDown size={14} />}
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();

      return (
        <Button
          className="w-full flex gap-x-2 justify-center items-center"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          {sortDirection === "asc" && <ArrowUp size={14} />}
          {sortDirection === "desc" && <ArrowDown size={14} />}
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();

      return (
        <Button
          className="w-full flex gap-x-2 justify-center items-center"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          {sortDirection === "asc" && <ArrowUp size={14} />}
          {sortDirection === "desc" && <ArrowDown size={14} />}
        </Button>
      );
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();

      return (
        <Button
          className="w-full flex gap-x-2 justify-center items-center"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          {sortDirection === "asc" && <ArrowUp size={14} />}
          {sortDirection === "desc" && <ArrowDown size={14} />}
        </Button>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();

      return (
        <Button
          className="w-full flex gap-x-2 justify-center items-center"
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number
          {sortDirection === "asc" && <ArrowUp size={14} />}
          {sortDirection === "desc" && <ArrowDown size={14} />}
        </Button>
      );
    },
  },
];
