import Title from '@UI/Title';
import { Button } from '@UI/btns/Button';
import { Input } from '@UI/forms/Input';
import { PhoneInput, PhoneInputRefProps } from '@UI/forms/PhoneInput';
import { Politics } from '@UI/forms/Politics';
import F from '@api/fetchers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { customTrigger } from '@utils/events';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useZorm } from 'react-zorm';
import { design } from './api';
import { QuestionFormSchema } from './schemas/QuestionFormSchema';

export function QuestionForm() {
  const phone = useRef<PhoneInputRefProps>(null);
  const { data: location } = useQuery({
    queryKey: ['location'],
    queryFn: F.location,
  });
  const post = useMutation({
    mutationFn: design,
    onSuccess(data) {
      toast(data);
      customTrigger('design-callback:send', document);
      zo.form?.reset();
      phone.current?.reset();
    },
    onError(error) {
      toast('Произошла ошибка при отправке формы.');
      throw error;
    },
  });
  const zo = useZorm('design-callback', QuestionFormSchema, {
    async onValidSubmit(e) {
      e.preventDefault();
      const data = { ...e.data, city: location?.name };
      post.mutate(data);
    },
  });

  return (
    <div className='mb-20 bg-bg px-page py-13 lg:mb-25'>
      <Title h={2} size={3} title='Остались вопросы?' />
      <p className='mb-10'>
        Заполните форму и менеджер свяжется с вами в ближайшее время
      </p>
      <form ref={zo.ref}>
        <fieldset className='flex flex-col gap-5 mb-7 sm:grid sm:grid-cols-2 sm:gap-x-8 md:gap-x-28'>
          <Input
            name={zo.fields.name()}
            label='Имя'
            placeholder='Введите имя'
            title='От 2 до 50 символов'
            required
            error={zo.errors.name((e) => e.message)}
          />
          <PhoneInput
            ref={phone}
            name={zo.fields.phone()}
            required
            error={zo.errors.phone((e) => e.message)}
          />
          <Input
            name={zo.fields.email()}
            label='Email'
            placeholder='Введите email'
            title='example@email.ru'
            required
            error={zo.errors.email((e) => e.message)}
          />
          <Input
            name={zo.fields.comment()}
            label='Сообщение'
            placeholder='Введите сообщение'
            title='От 10 до 500 символов'
            error={zo.errors.comment((e) => e.message)}
          />
        </fieldset>
        <fieldset className='flex flex-col gap-8 sm:grid sm:grid-cols-2 md:gap-x-28'>
          <Politics />
          <Button
            type='submit'
            size='md'
            color='black'
            className='w-full max-w-sm'
          >
            Отправить
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
