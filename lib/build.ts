import { createBuilder } from "https://deno.land/x/danielduel_ultra_stack_ultra@0.0.5/build.ts";

const builder = createBuilder({
  browserEntrypoint: import.meta.resolve("./client.tsx"),
  serverEntrypoint: import.meta.resolve("./server.tsx"),
});

builder.ignore([
  "./README.md",
  "./importMap.json",
  "./*.dev.json",
  "./*.test.ts",
]);

// deno-lint-ignore no-unused-vars
const result = await builder.build();
