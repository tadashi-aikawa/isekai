import { createApiClient } from "~/client";
import { isErrorFromPath } from "@zodios/core";

export const useReqres = (baseUrl: string = "https://reqres.in/api") => {
  const client = createApiClient(baseUrl);

  const getUsers = async () => {
    const path = "/users";
    try {
      return { res: await client.get(path) };
    } catch (error) {
      // このif文には入らないが一応今後のお手本として
      if (isErrorFromPath(client.api, "get", path, error)) {
        return { error };
      }
      throw Error("Unexpected error");
    }
  };

  return { getUsers };
};
