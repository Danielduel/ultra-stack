export const apiV1Handler = async (request: Request) => {
  return new Response(
    JSON.stringify({ hello: "hello" }),
    {
      headers: {
        "Content-Type": "text/bplist",
      },
    },
  );
};
