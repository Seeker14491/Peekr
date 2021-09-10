import type { InvokeArgs } from "@tauri-apps/api/tauri";

// Workaround for https://github.com/vitejs/vite/issues/2393
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function invoke(cmd: string, args?: InvokeArgs): Promise<any> {
  const { invoke: tauri_invoke } = await import("@tauri-apps/api/tauri");
  return tauri_invoke(cmd, args);
}
