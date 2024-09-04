export function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.NEXT_PUBLIC_VERCEL_URL)
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}
