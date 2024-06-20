import type { TypeChatJsonValidator, TypeChatLanguageModel } from "typechat";

import { createJsonTranslator, createLanguageModel } from "typechat";

import type { AIContext } from "./type";

import { aiCtxToEnv } from "./type";

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
    return aiCtxToEnv(this.ctx);
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
