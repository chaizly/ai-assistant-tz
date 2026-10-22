import { z } from 'zod'

export const tzSchema = z.object({
  processName: z
    .string()
    .min(5, 'Минимум 5 символов')
    .max(120, 'Максимум 120 символов'),
  description: z
    .string()
    .min(20, 'Минимум 20 символов')
    .max(2000, 'Максимум 2000 символов'),
  targetUrl: z.string().url('Введите корректный URL'),
  fields: z.array(z.string()).min(1, 'Выберите хотя бы одно поле'),
  priority: z.enum(['low', 'medium', 'high']),
})

export type TzFormValues = z.infer<typeof tzSchema>