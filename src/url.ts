import { getEnvOrThrow } from "./runtime.ts";

export function buildUrl(
  path: string,
  baseUrl: string = getBaseUrl(),
): string {
  const normalizedBaseUrl = baseUrl.replace(/\/*$/, "");
  const normalizedPath = path.replace(/^\/*|\/*$/g, "");

  return `${normalizedBaseUrl}${normalizedPath ? `/${normalizedPath}` : ""}`;
}

export function joinPath(...paths: string[]): string {
  const filteredPaths = paths.filter((path) => path.length > 0);
  const normalizedPaths = filteredPaths.map((path) =>
    path.replace(/^\/*|\/*$/g, "")
  ).join("/");
  return `/${normalizedPaths}`;
}

export function getBaseUrl(): string {
  const host = getEnvOrThrow("JET_BREEZE_HOST");
  const pathPrefix = getEnvOrThrow("JET_BREEZE_PATH_PREFIX");

  return buildUrl(pathPrefix, host);
}
