import config from '@data/config';
import { z } from 'zod';

const mes = config.validator.messages;
export const QuestionFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: mes.string.min(2) })
    .max(50, { message: mes.string.max(50) }),
  phone: z
    .string()
    .regex(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/, { message: mes.string.phone }),
  email: z.string().email({ message: mes.string.email }),
  comment: z.string().optional(),
});

export type TQuestionFormSchema = typeof QuestionFormSchema._type & {
  city?: string;
};
