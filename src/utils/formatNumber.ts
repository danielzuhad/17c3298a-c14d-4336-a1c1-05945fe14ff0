export const getFormattedInputValue = (
  value: string,
  previousValue: string
) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  // Check if the user is deleting characters
  const isDeleting = value.length < previousValue.length;

  let res = "";

  if (digits.length > 0) {
    res = `(${digits.slice(0, 3)}`;
  }
  if (digits.length > 3) {
    res = `${res}) ${digits.slice(3, 6)}`;
  }
  if (digits.length > 6) {
    res += `-${digits.slice(6)}`;
  }

  // Only apply formatting if not deleting
  return isDeleting ? value : res;
};
