import type { TypeChatJsonValidator, TypeChatLanguageModel } from "typechat";

import OpenAI from "openai";
import { createJsonTranslator, createLanguageModel } from "typechat";

import type { AIContext, AIEnv } from "./type";

import { aiCtxToEnv } from "./type";

type UseTypeChatInput<T extends object> = {
  request: string;
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

  public async useOpenAIChatCompletions(prompt: string) {
    return await this.OpenAI.chat.completions.create({
      messages: [{ content: prompt, role: "user" }],
      model: this.AIEnv.OPENAI_MODEL,
    });
  }

  public async useTypeChat<T extends object>({
    request,
    validator,
  }: UseTypeChatInput<T>) {
    const translator = createJsonTranslator(this.TypeChatModel, validator);
    return await translator.translate(request);
  }
}

export { AI };
