import { z } from "zod";
import { useI18n } from "vue-i18n";

export function getRegisterSchema() {
  const { t } = useI18n();
  return z
    .object({
      name: z.string().min(2, t("validation.name")),
      email: z.string().email(t("validation.email")),
      password: z
        .string()
        .min(6)
        .regex(/[A-Z]/, t("validation.uppercase"))
        .regex(/[0-9]/, t("validation.number"))
        .optional(),
      repeatPassword: z.string().optional(),
    })
    .refine(
      (data) => !data.password || !data.repeatPassword || data.password === data.repeatPassword,
      {
        message: t("validation.passwordsMatch"),
        path: ["repeatPassword"],
      }
    );
}
