import { eventType } from 'models/Event';
import * as yup from 'yup';

export const editEventSchema = yup
  .object({
    title: yup.string().min(2, 'Too Short!').max(30, 'Too Long!'),
    text: yup.string().min(2, 'Too Short!').max(30, 'Too Long!'),
    eventType: yup.string().oneOf([eventType.minor, eventType.warning, eventType.important]),
    eventDate: yup
      .string()
      .required('Event date is required!')
      .typeError('Event date is required!')
      .notOneOf(['Invalid date'], 'Choose correct date'),
  })
  .required();
