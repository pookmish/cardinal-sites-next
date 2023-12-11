import {GetStaticPathsResult} from "next";
import {AccessToken, JsonApiParams, JsonApiResourceWithPath} from "next-drupal";
import {getResourceCollection} from "@lib/drupal/get-resource";
import {Params} from "@lib/types";

export const getPathsFromContext = async (
  types: string | string[],
  options: {
    params?: JsonApiParams
    accessToken?: AccessToken
  } = {}
): Promise<GetStaticPathsResult["paths"]> => {
  if (typeof types === "string") types = [types]


  const paths = await Promise.all<{ params: Params }[]>(
    types.map(async (type) => {
      // Use sparse fieldset to expand max size.
      options.params = {[`fields[${type}]`]: "path", ...options?.params}

      const resources = await getResourceCollection<JsonApiResourceWithPath>(type, {
        deserialize: true,
        ...options,
      })

      return buildPathsFromResources(resources)
    })
  )

  return paths.flat()
}

function buildPathsFromResources(resources: JsonApiResourceWithPath[]) {
  return resources?.flatMap((resource): { params: Params } => {
    const slug = resource?.path?.alias

    return {
      params: {slug: slug ? `${slug?.replace(/^\/|\/$/g, "")}`.split("/") : []},
    }
  })
}
