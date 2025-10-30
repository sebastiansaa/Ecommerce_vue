import z from "zod";
import { useI18n } from 'vue-i18n'

export function getLoginSchema() {
  const { t } = useI18n();
  return z.object({
    email: z.string().email(t('validation.email')).optional(),
    password: z
      .string()
      .min(6)
      .regex(/[A-Z]/, t('validation.uppercase'))
      .regex(/[0-9]/, t('validation.number'))
      .optional(),
  });
}
