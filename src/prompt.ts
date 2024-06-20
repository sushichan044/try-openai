import type { UserContext } from "./userIO";

const getPrompt = (context: UserContext) => {
  const prompt = `
あなたはプロの管理栄養士です。
1時間以内に調理できる栄養バランスの良い夕食のレシピを料理初心者向けに提案してください。
ただし、以下の食材を使わないでください。

${context.allergies.map((c) => `- ${c}`).join("\n")}

結果は、以下のフォーマットで提出してください。
interface MenuResponse {
  name: string;  // メニュー名
  ingredients: string[]; // 1人分の必要な食材
  steps: string[]; // 作り方・unordered list
}
作り方は詳しく書いてください。例えば、調理器具や温度、調理時間など、具体的な手順を示してください。
  `;
  return prompt;
};

export { getPrompt };
