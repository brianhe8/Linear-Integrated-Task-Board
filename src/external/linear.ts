const LINEAR_GRAPHQL_URL = "https://api.linear.app/graphql";

interface LinearGraphQLError {
  extensions?: unknown;
  message: string;
  path?: (number | string)[];
}

interface LinearGraphQLResponse<TData> {
  data?: TData;
  errors?: LinearGraphQLError[];
}

function getLinearApiKey(): string {
  const key = process.env.LINEAR_API_KEY;
  if (!key) throw new Error("Missing LINEAR_API_KEY in environment");
  return key;
}

async function linearGraphQL<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const apiKey = getLinearApiKey();

  const res = await fetch(LINEAR_GRAPHQL_URL, {
    body: JSON.stringify({ query, variables }),
    headers: {
      authorization: apiKey,
      "content-type": "application/json",
    },
    method: "POST",
  });

  const json = (await res.json()) as LinearGraphQLResponse<TData>;

  if (!res.ok) {
    const apiErrorMsg = json.errors
      ?.map((e) => e.message)
      .filter(Boolean)
      .join("; ");
    const msg =
      apiErrorMsg ?? `Linear request failed with status ${String(res.status)}`;
    throw new Error(msg);
  }

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data) throw new Error("Linear response missing data");
  return json.data;
}

export { linearGraphQL };
