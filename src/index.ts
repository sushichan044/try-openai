import { createJsonTranslator, createLanguageModel } from "typechat";
import { processRequests } from "typechat/interactive";
import { createZodJsonValidator } from "typechat/zod";

import { getEnv } from "./env";
import { SentimentSchema } from "./schema";

const env = getEnv();
const model = createLanguageModel(env);
const validator = createZodJsonValidator(SentimentSchema, "SentimentResponse");
const translator = createJsonTranslator(model, validator);

// Process requests interactively or from the input file specified on the command line
void processRequests("😀> ", process.argv[2], async (request) => {
  const response = await translator.translate(request);
  if (!response.success) {
    console.log(response.message);
    return;
  }
  console.log(`The sentiment is ${response.data.sentiment}`);
});
