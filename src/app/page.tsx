"use client";

import UserTable from "@/components/UserTable/UserTable";

export default function Home() {
  return (
    <>
      <main className="min-h-screen max-w-screen w-full flex justify-center items-center">
        <UserTable />
      </main>
    </>
  );
}
