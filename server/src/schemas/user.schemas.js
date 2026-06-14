import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(30, "El nombre de usuario no puede superar los 30 caracteres")
    .trim()
    .optional(),

  email: z
    .string()
    .email("Debes ingresar un correo electrónico válido")
    .trim()
    .toLowerCase()
    .optional(),

  avatar: z
    .object({
      public_id: z.string().optional(),

      url: z.string().url("La URL de la imagen no es válida").optional(),
    })
    .optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "La contraseña actual debe tener al menos 8 caracteres"),

  newPassword: z
    .string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
});
