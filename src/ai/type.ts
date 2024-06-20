import z from "zod";

import { OPENAI_ACTUAL_MODEL_NAMES, OPENAI_MODELS } from "./openai";

interface AIContext {
  apiKey: string;
  model: (typeof OPENAI_MODELS)[number];
}

const aiEnv = z.object({
  OPENAI_API_KEY: z.string(),
  OPENAI_MODEL: z
    .enum(OPENAI_MODELS)
    .transform((model) => OPENAI_ACTUAL_MODEL_NAMES[model]),
});
type AIEnv = z.infer<typeof aiEnv>;

const aiCtxToEnv = (ctx: AIContext) => {
  const env = aiEnv.safeParse({
    OPENAI_API_KEY: ctx.apiKey,
    OPENAI_MODEL: ctx.model,
  });
  if (!env.success) {
    throw new Error(env.error.toString());
  }
  return env.data;
};

export { aiCtxToEnv };
export type { AIContext, AIEnv };
