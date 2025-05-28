import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { getEnv, getEnvOrThrow } from "../lib/runtime.ts";

describe("Runtime Module", () => {
  it("getEnv should return the value of an environment variable", () => {
    Deno.env.set("TEST_VAR", "testValue");
    assertEquals(getEnv("TEST_VAR"), "testValue");
  });

  it("getEnvOrThrow should throw if the environment variable is not set", () => {
    const key = "NON_EXISTENT_VAR";

    assertThrows(
      () => getEnvOrThrow(key),
      Error,
      `Missing environment variable: ${key}`,
    );
  });
});
