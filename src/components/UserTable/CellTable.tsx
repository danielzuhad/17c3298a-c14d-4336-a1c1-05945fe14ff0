import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputTable from "./InputTable";
import { z } from "zod";
import { FormSchema } from "@/schema/formSchema";
import { UserKeysType } from "@/type/UserKeyType";
import { Table } from "@tanstack/react-table";
import { User } from "@prisma/client";

interface CellComponentProps {
  id: string;
  initialValue: any;
  columnSpecificSchema: z.ZodSchema;
  cellValuesRef: React.MutableRefObject<any[]>;
  originalId: number;
  table: Table<User>;
}

const CellComponent: React.FC<CellComponentProps> = ({
  id,
  initialValue,
  columnSpecificSchema,
  cellValuesRef,
  originalId,
}) => {
  const [value, setValue] = useState(initialValue);

  const specificMethods = useForm<FormSchema>({
    resolver: zodResolver(columnSpecificSchema),
    defaultValues: { [id]: initialValue },
    mode: "onChange",
  });

  const {
    formState: { errors, isDirty },
    getFieldState,
    reset: resetForm,
  } = specificMethods;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    resetForm({ [id]: initialValue });
  }, [initialValue, id, resetForm]);

  const updateCellValue = (id: number, columnId: string, value: any) => {
    cellValuesRef.current = cellValuesRef.current.map((cell) =>
      cell.id === id && cell.columnId === columnId ? { ...cell, value } : cell
    );
  };

  const addCellValue = (id: number, columnId: string, value: any) => {
    const existingIndex = cellValuesRef.current.findIndex(
      (cell) => cell.id === id && cell.columnId === columnId
    );

    if (existingIndex !== -1) {
      cellValuesRef.current[existingIndex] = { id, columnId, value };
    } else {
      cellValuesRef.current.push({ id, columnId, value });
    }
  };

  const handleBlur =
    (id: number, columnId: string) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const existingIndex = cellValuesRef.current.findIndex(
        (cell) => cell.id === id && cell.columnId === columnId
      );

      if (existingIndex !== -1) {
        updateCellValue(id, columnId, newValue);
      } else {
        addCellValue(id, columnId, newValue);
      }
    };

  return (
    <Controller
      name={id as UserKeysType}
      control={specificMethods.control}
      render={({ field }) => (
        <InputTable
          {...field}
          className={`transition-all ${
            getFieldState(id as UserKeysType).isDirty && "bg-green-200"
          } ${errors[id as UserKeysType] && "bg-red-200"}`}
          error={errors[id as UserKeysType]?.message || null}
          isValidating={getFieldState(id as UserKeysType).isValidating}
          type="text"
          value={value as string}
          onChange={async (e) => {
            const newValue = e.target.value;
            setValue(newValue);
            field.onChange(newValue);
          }}
          onBlur={(e) => {
            handleBlur(originalId, id)(e);
            field.onBlur();
          }}
        />
      )}
    />
  );
};

export default CellComponent;
