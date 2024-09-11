import { User } from "@prisma/client";

export type UserKeysType = keyof Omit<User, "id">;
