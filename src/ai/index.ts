import type { TypeChatJsonValidator, TypeChatLanguageModel } from "typechat";

import { createJsonTranslator, createLanguageModel } from "typechat";

import type { AIContext } from "./type";

import { aiEnv } from "./type";

type UseTypeChatInput<T extends object> = {
  request: string;
  validator: TypeChatJsonValidator<T>;
};

class AI {
  private readonly ctx: AIContext;
  private readonly tcModel: TypeChatLanguageModel;

  constructor(ctx: AIContext) {
    this.ctx = ctx;
    this.tcModel = createLanguageModel(this.getLLMOptions());
  }

  private getLLMOptions() {
    const env = aiEnv.safeParse({
      OPENAI_API_KEY: this.ctx.apiKey,
      OPENAI_MODEL: this.ctx.model,
    });
    if (!env.success) {
      throw new Error(env.error.toString());
    }
    return env.data;
  }

  public async useTypeChat<T extends object>({
    request,
    validator,
  }: UseTypeChatInput<T>) {
    const translator = createJsonTranslator(this.tcModel, validator);
    return await translator.translate(request);
  }
}

export { AI };
