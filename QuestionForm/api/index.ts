import fetcher from '@utils/fetcher';
import { TQuestionFormSchema } from '../schemas/QuestionFormSchema';

export const design = (data: TQuestionFormSchema) => {
  return fetcher<string, TQuestionFormSchema>(
    '/forms/design/',
    data,
    'POST',
  );
};
