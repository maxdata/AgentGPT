import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { get } from "../services/fetch-utils";

const Model = z.object({
  name: z.string(),
  max_tokens: z.number(),
  has_access: z.boolean(),
});

const ModelList = z.array(Model);

export type LLMModel = z.infer<typeof Model>;

export function useModels() {
  const session = {
    'accessToken': 'abc'  
  }

  const query = useQuery(
    ["llm"],
    async () => await get("/api/models", ModelList, session?.accessToken),
    {
      enabled: !!session?.accessToken,
    }
  );

  return {
    models: query.data ?? [],
    getModel: (name: string) => query.data?.find((m) => m.name === name),
  };
}
