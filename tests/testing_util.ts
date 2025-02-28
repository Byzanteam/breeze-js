import { afterEach, beforeEach, type Stub, stub } from "../dev_deps.ts";
import { _internals } from "../lib/runtime.ts";

let envs: {
  key: string;
  value: string;
}[] = [];

function doGetEnv(key: string): string | undefined {
  const env = envs.find((env) => env.key === key);
  return env?.value;
}

export function setupEnv() {
  let doGetEnvStub: Stub<typeof _internals>;

  beforeEach(() => {
    doGetEnvStub = stub(_internals, "doGetEnv", doGetEnv);
  });

  afterEach(() => {
    envs = [];
    doGetEnvStub.restore();
  });

  function setEnv(key: string, value: string) {
    envs.push({ key, value });
  }

  return { setEnv };
}
