import { createZodJsonValidator } from "typechat/zod";
import { z } from "zod";

const MenuResponse = z.object({
  ingredients: z.array(z.string()).describe("1人分の必要な食材"),
  name: z.string().min(1).max(100).describe("メニュー名"),
  steps: z.array(z.string()).describe("作り方"),
});

const SCHEMAS = {
  MenuResponse,
};

const menuValidator = createZodJsonValidator(SCHEMAS, "MenuResponse");

export { menuValidator };
