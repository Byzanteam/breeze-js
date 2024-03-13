import { buildUrl, getBaseUrl, joinPath } from "../lib/url.ts";
import { assertEquals, describe, it } from "../dev_deps.ts";
import { setupEnv } from "./testing_util.ts";

describe("buildUrl function", () => {
  const { setEnv } = setupEnv();

  it("should correctly concatenate base URL and path", () => {
    const baseUrl = "http://example.com";
    const path = "path/to/resource";
    const expected = "http://example.com/path/to/resource";
    assertEquals(buildUrl(path, baseUrl), expected);
  });

  it("should correctly handle base URL ending with a slash", () => {
    const baseUrl = "http://example.com/";
    const path = "path/to/resource";
    const expected = "http://example.com/path/to/resource";
    assertEquals(buildUrl(path, baseUrl), expected);
  });

  it("should correctly handle path starting with a slash", () => {
    const baseUrl = "http://example.com";
    const path = "/path/to/resource";
    const expected = "http://example.com/path/to/resource";
    assertEquals(buildUrl(path, baseUrl), expected);
  });

  it("should correctly handle both base URL ending and path starting with a slash", () => {
    const baseUrl = "http://example.com/";
    const path = "/path/to/resource";
    const expected = "http://example.com/path/to/resource";
    assertEquals(buildUrl(path, baseUrl), expected);
  });

  it("should correctly build a full URL using JET_BREEZE_HOST and JET_BREEZE_PATH_PREFIX as the base URL", () => {
    setEnv("JET_BREEZE_HOST", "http://example.com");
    setEnv("JET_BREEZE_PATH_PREFIX", "/api");
    const path = "path/to/resource";
    const expected = "http://example.com/api/path/to/resource";
    assertEquals(buildUrl(path), expected);
  });
});

describe("joinPath function", () => {
  it("should correctly join multiple path segments", () => {
    const paths = ["path", "to", "resource"];
    const expected = "/path/to/resource";
    assertEquals(joinPath(...paths), expected);
  });

  it("should correctly handle leading slashes in segments", () => {
    const paths = ["/path", "/to", "/resource"];
    const expected = "/path/to/resource";
    assertEquals(joinPath(...paths), expected);
  });

  it("should correctly handle trailing slashes in segments", () => {
    const paths = ["path/", "to/", "resource/"];
    const expected = "/path/to/resource";
    assertEquals(joinPath(...paths), expected);
  });

  it("should handle empty segments", () => {
    const paths = ["path", "", "resource"];
    const expected = "/path/resource";

    assertEquals(joinPath(...paths), expected);
  });
});

describe("getBaseUrl function", () => {
  const { setEnv } = setupEnv();

  it("should correctly construct base URL from JET_BREEZE_HOST and JET_BREEZE_PATH_PREFIX", () => {
    setEnv("JET_BREEZE_HOST", "http://example.com");
    setEnv("JET_BREEZE_PATH_PREFIX", "/api");
    const expected = "http://example.com/api";

    assertEquals(getBaseUrl(), expected);
  });

  it("should handle host with a subpath", () => {
    setEnv("JET_BREEZE_HOST", "http://example.com/subpath");
    setEnv("JET_BREEZE_PATH_PREFIX", "/api");
    const expected = "http://example.com/subpath/api";
    assertEquals(getBaseUrl(), expected);
  });
});
