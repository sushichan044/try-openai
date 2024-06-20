import type { TypeChatJsonValidator, TypeChatLanguageModel } from "typechat";

import { err, ok } from "neverthrow";
import OpenAI from "openai";
import { createJsonTranslator, createLanguageModel } from "typechat";

import type { AIContext, AIEnv } from "./type";

import { aiCtxToEnv } from "./type";

type UseTypeChatInput<T extends object> = {
  prompt: {
    promptPreamble?: Parameters<TypeChatLanguageModel["complete"]>[0];
    request: string;
  };
  validator: TypeChatJsonValidator<T>;
};

class AI {
  private readonly AIEnv: AIEnv;
  private readonly OpenAI: OpenAI;
  private readonly TypeChatModel: TypeChatLanguageModel;

  constructor(ctx: AIContext) {
    this.AIEnv = aiCtxToEnv(ctx);
    this.OpenAI = new OpenAI({ apiKey: this.AIEnv.OPENAI_API_KEY });
    this.TypeChatModel = createLanguageModel(this.AIEnv);
  }

  public async useOpenAIChatCompletions(
    ...args: Parameters<typeof this.OpenAI.chat.completions.create>
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ model, ...rest }, options] = args;
    const body = { model: this.AIEnv.OPENAI_MODEL, ...rest };

    try {
      const res = await this.OpenAI.chat.completions.create(body, options);
      return ok(res);
    } catch (e) {
      return err(String(e));
    }
  }

  public async useTypeChat<T extends object>({
    prompt,
    validator,
  }: UseTypeChatInput<T>) {
    const translator = createJsonTranslator(this.TypeChatModel, validator);
    const result = await translator.translate(
      prompt.request,
      prompt.promptPreamble,
    );

    if (result.success) {
      return ok(result.data);
    }
    return err(result.message);
  }
}

export { AI };
