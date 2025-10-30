import { axiosAutherizedAdapter } from "@/shared/api";
import { getSocialLoginSchema } from "../schema";

export async function loginSocialMedia(token: string, provider: "google" | "facebook", email?: string) {
  const data = getSocialLoginSchema().parse({
    token,
    provider,
    email
  })
  return axiosAutherizedAdapter.post('/auth/social-login', data
  )
}
