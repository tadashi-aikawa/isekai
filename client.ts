import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const User = z
  .object({
    id: z.number().int(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.string(),
  })
  .partial()
  .passthrough();

export const schemas = {
  User,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/users",
    alias: "getUsers",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "per_page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z
      .object({
        page: z.number().int(),
        per_page: z.number().int(),
        total: z.number().int(),
        total_pages: z.number().int(),
        data: z.array(User),
      })
      .partial()
      .passthrough(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
