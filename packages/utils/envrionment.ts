export const isLocal = () => {
  return Deno.env.get("WEBAPP_ENVIRONMENT") === "local";
};

export const isWebappRemote = () => {
  return Deno.env.get("WEBAPP_REMOTE") === "true";
};

export const isReadOnly = () => {
  return Deno.env.get("WEBAPP_READONLY") === "true";
};
