import {
  assertType,
  type Has,
  type IsExact,
  type IsNullable,
} from "../dev_deps.ts";

{
  type Result = ReturnType<typeof BreezeRuntime.getDeploymentInfo>;

  assertType<IsExact<Result, BreezeRuntime.DeploymentInfo>>(true);
}

{
  type Name = Parameters<typeof BreezeRuntime.getPlugin>[0];
  type Result = ReturnType<typeof BreezeRuntime.getPlugin>;

  assertType<IsExact<Name, string>>(true);
  assertType<Has<Result, BreezeRuntime.Plugin>>(true);
  assertType<IsNullable<Result>>(true);
}

{
  type Options = Parameters<typeof BreezeRuntime.generateToken>[0];
  type Result = ReturnType<typeof BreezeRuntime.generateToken>;

  assertType<Has<Options, BreezeRuntime.TokenOptions>>(true);
  assertType<IsNullable<Options>>(true);
  assertType<IsExact<Result, string>>(true);
}

{
  type Name = Parameters<typeof BreezeRuntime.pluginFetch>[0];
  type Path = Parameters<typeof BreezeRuntime.pluginFetch>[1];
  type Options = Parameters<typeof BreezeRuntime.pluginFetch>[2];
  type Result = ReturnType<typeof BreezeRuntime.pluginFetch>;

  assertType<IsExact<Name, string>>(true);
  assertType<Has<Path, string> | Has<Path, RequestInit> | IsNullable<Path>>(
    true,
  );
  assertType<Has<Options, RequestInit> | IsNullable<Options>>(true);
  assertType<IsExact<Result, Promise<Response>>>(true);
}
