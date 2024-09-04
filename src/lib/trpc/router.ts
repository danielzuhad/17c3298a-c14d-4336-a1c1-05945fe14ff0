import prisma from "../prisma/prisma";
import { baseProcedure, createTRPCRouter } from "./init";
import { z } from "zod";

export const appRouter = createTRPCRouter({
  // Read operation: Get a user by ID
  getUsers: baseProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),

  // Create operation: Create a new user
  createUser: baseProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        position: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
      });
      return user;
    }),

  // Update multiple users by ID
  updateMultipleUsers: baseProcedure
    .input(
      z.array(
        z.object({
          id: z.number(),
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          email: z.string().optional(),
          position: z.string().optional(),
          phoneNumber: z.string().optional(),
        })
      )
    )
    .mutation(async ({ input }) => {
      const updatedUsers = await Promise.all(
        input.map((user) =>
          prisma.user.update({
            where: { id: user.id },
            data: user,
          })
        )
      );
      return updatedUsers;
    }),

  //  Delete multiple users by ID
  deleteMultipleUsers: baseProcedure
    .input(z.array(z.number()))
    .mutation(async ({ input }) => {
      const deletedUsers = await Promise.all(
        input.map((id) =>
          prisma.user.delete({
            where: { id },
          })
        )
      );
      return deletedUsers;
    }),
});

export type AppRouter = typeof appRouter;
