import { z } from "zod";

const EnvSchema = z.object({
  OPENAI_API_KEY: z.string(),
});

const getEnv = () => {
  const env = process.env;
  const result = EnvSchema.safeParse(env);
  if (!result.success) {
    throw new Error(result.error.errors.join(", "));
  }
  return result.data;
};

export { getEnv };
