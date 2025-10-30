import { z } from "zod";
import { useI18n } from "vue-i18n";

export function getSocialLoginSchema() {
  const { t } = useI18n();
  return z.object({
    token: z.string().min(1, t("validation.token")),
    provider: z.enum(["google", "facebook"]),
    email: z.string().email(t("validation.email")).optional(),
  });
}
