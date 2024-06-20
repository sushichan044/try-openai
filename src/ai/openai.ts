// https://platform.openai.com/docs/models
const OPENAI_MODELS = ["gpt-3.5-turbo", "gpt-4-turbo", "gpt-4o"] as const;
const OPENAI_ACTUAL_MODEL_NAMES = {
  "gpt-3.5-turbo": "gpt-3.5-turbo-0125",
  "gpt-4-turbo": "gpt-4-turbo-2024-04-09",
  "gpt-4o": "gpt-4o-2024-05-13",
} as const satisfies {
  [K in (typeof OPENAI_MODELS)[number]]: string;
};

export { OPENAI_ACTUAL_MODEL_NAMES, OPENAI_MODELS };
