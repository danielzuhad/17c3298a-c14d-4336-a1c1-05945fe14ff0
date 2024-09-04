import { appRouter } from "@/lib/trpc/router";
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: function (
      opts: FetchCreateContextFnOptions
    ): object | Promise<object> {
      return {};
    },
  });

export { handler as GET, handler as POST };
