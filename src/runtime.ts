export function getEnv(key: string): string | undefined {
  return _internals.doGetEnv(key);
}

export function getEnvOrThrow(key: string): string {
  const value = getEnv(key);
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export function serve(
  handler: (req: Request) => Response | Promise<Response>,
) {
  Deno.serve(
    {
      port: 0,
      onListen() {
        const url = new URL(
          getEnvOrThrow("JET_BREEZE_PATH_PREFIX"),
          getEnvOrThrow("JET_BREEZE_HOST"),
        );
        console.log(`Listening on ${url.toString()}`);
      },
    },
    handler,
  );
}

function doGetEnv(key: string): string | undefined {
  return Deno.env.get(key);
}

export const _internals = { doGetEnv };
