import { UseFormReturn } from "react-hook-form";

export const validateFields = (
  methods: UseFormReturn<
    {
      firstName: string;
      lastName: string;
      position: string;
      phoneNumber: string;
      email: string;
    },
    any,
    undefined
  >
) => {
  const fields = [
    "firstName",
    "lastName",
    "email",
    "position",
    "phoneNumber",
  ] as const;

  fields.forEach((field) => {
    const value = methods.getValues(field);
    if (!value) {
      methods.setError(field, {
        type: "required",
        message: `${field} is required`,
      });
    }
  });
};
