declare namespace BreezeRuntime {
  export interface DeploymentInfo {
    projectId: string;
    environmentId: string;
    functionId: string;
  }

  export interface Plugin {
    id: string;
    endpoint: string;
  }

  /**
   * A JWT token generated by Breeze to authorize plugin  or workflow requests.
   */
  export type Token = string;

  export interface TokenOptions {
    /**
     * The instance name of plugin.
     */
    plugin?: string;
  }

  /**
   * Retrieves the current deployment information.
   * @returns The deployment information of the current function.
   */
  export function getDeploymentInfo(): DeploymentInfo;

  /**
   * Retrieves a registered plugin by its name.
   * @param plugin - The name of the plugin.
   * @returns The plugin instance if found, otherwise `null`.
   */
  export function getPlugin(plugin: string): Plugin | null;

  /**
   * Generates an authentication token for a plugin or workflow request.
   * @param opts - Optional settings for the token generation.
   * @returns A JWT token.
   */
  export function generateToken(opts?: TokenOptions): Token;

  /**
   * Performs a fetch request to the specified plugin.
   * @param plugin - The name of the plugin.
   * @returns A `Promise` resolving to the response.
   */
  export function pluginFetch(plugin: string): Promise<Response>;

  /**
   * Performs a fetch request to a specific path on the specified plugin.
   * @param plugin - The name of the plugin.
   * @param path - The request path.
   * @returns A `Promise` resolving to the response.
   */
  export function pluginFetch(
    plugin: string,
    path: string,
  ): Promise<Response>;

  /**
   * Performs a fetch request to a plugin with custom request options.
   * @param plugin - The name of the plugin.
   * @param opts - The fetch request options.
   * @returns A `Promise` resolving to the response.
   */
  export function pluginFetch(
    plugin: string,
    opts: RequestInit,
  ): Promise<Response>;

  /**
   * Performs a fetch request to a specific path on a plugin with custom request options.
   * @param plugin - The name of the plugin.
   * @param path - The request path.
   * @param opts - The fetch request options.
   * @returns A `Promise` resolving to the response.
   */
  export function pluginFetch(
    plugin: string,
    path: string,
    opts: RequestInit,
  ): Promise<Response>;
}
