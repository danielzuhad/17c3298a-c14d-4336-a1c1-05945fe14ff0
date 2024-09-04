"use client";

import { formSchema, FormSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";

const useUserTable = () => {
  const { data: users, isLoading, error, refetch } = trpc.getUsers.useQuery();

  const createUserMutation = trpc.createUser.useMutation();
  const updateUserMutation = trpc.updateMultipleUsers.useMutation();
  const deleteUserMutation = trpc.deleteMultipleUsers.useMutation();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleDeleteUsers = async (userIds: number[]) => {
    try {
      await deleteUserMutation.mutateAsync(userIds);
      await refetch();
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return {
    methods,
    users,
    isLoading,
    // defaultColumn,
    // cellValuesRef,
    handleDeleteUsers,
    createUserMutation,
    updateUserMutation,
    refetch,
  };
};

export default useUserTable;
