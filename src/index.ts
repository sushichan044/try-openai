import type { UserContext } from "./userIO";

import { AI } from "./ai";
import { getPrompt } from "./prompt";
import { menuValidator } from "./schema";
import { getEnv } from "./userIO";

const env = getEnv();

const USER_CONTEXT: UserContext = {
  allergies: ["牛乳", "えび"],
};

// Process requests interactively or from the input file specified on the command line
async function generateMenu() {
  const ai = new AI({ apiKey: env.OPENAI_API_KEY, model: "gpt-4o" });

  const prompt = getPrompt(USER_CONTEXT);
  const response = await ai.useTypeChat({
    prompt: { request: prompt },
    validator: menuValidator,
  });

  return response;
}

const main = async () => {
  const res = await generateMenu();
  if (res.isErr()) {
    console.error(res.error);
    return;
  }
  console.dir(res.value, { depth: null });
  return;
};

void main();
