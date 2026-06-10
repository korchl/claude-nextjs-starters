import { z } from "zod"

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
})

export type LoginFormData = z.infer<typeof loginSchema>

// 검색 입력 스키마
export const searchSchema = z.object({
  query: z.string().min(1, "검색어를 입력하세요").max(100, "검색어는 100자 이하여야 합니다"),
})

export type SearchFormData = z.infer<typeof searchSchema>

// 회원가입 폼 스키마
export const signupSchema = z
  .object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
    email: z.string().email("유효한 이메일을 입력하세요"),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  })

export type SignupFormData = z.infer<typeof signupSchema>
