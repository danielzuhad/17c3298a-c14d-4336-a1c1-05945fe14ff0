"use client";

import { formSchema, FormSchema, updateSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import toast from "react-hot-toast";

const useUserTable = () => {
  const { data: users, isLoading, error, refetch } = trpc.getUsers.useQuery();

  const createUserMutation = trpc.createUser.useMutation();
  const updateUserMutation = trpc.updateMultipleUsers.useMutation();
  const deleteUserMutation = trpc.deleteMultipleUsers.useMutation();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const useSpecificMethods = ({
    id,
    initialValue,
  }: {
    id: string;
    initialValue: any;
  }) => {
    const specificMethods = useForm<FormSchema>({
      resolver: zodResolver(updateSchema),
      defaultValues: { [id]: initialValue },
      mode: "onChange",
    });

    return specificMethods;
  };

  const handleDeleteUsers = async (userIds: number[]) => {
    try {
      await toast.promise(deleteUserMutation.mutateAsync(userIds), {
        loading: "Deleting users...",
        success: "Users deleted successfully",
        error: "Error deleting users",
      });
      await refetch();
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const hanldeIsLoading = () => {
    return (
      createUserMutation.isPending ||
      updateUserMutation.isPending ||
      deleteUserMutation.isPending
    );
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
    hanldeIsLoading,
    useSpecificMethods,
  };
};

export default useUserTable;
