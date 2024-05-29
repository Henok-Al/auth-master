import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterSchema = z.object({
  name: z.string().min(3),
  email:z.string().email(),
  password:z.string().min(8)
})

export const ResetSchema = z.object({
  email: z.string().email()
})

export const TwoFactorSchema = z.object({
  code: z.string().length(6)
})

export const NewPasswordSchema = z.object({
  password: z.string().length(8)
})