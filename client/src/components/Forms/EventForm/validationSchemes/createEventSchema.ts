import { eventType } from 'models/Event';
import * as yup from 'yup';

export const createEventSchema = yup
  .object({
    title: yup.string().required('Title is required!').min(2, 'Too Short!').max(30, 'Too Long!'),
    text: yup.string().required('Text is required!').min(2, 'Too Short!').max(30, 'Too Long!'),
    eventType: yup
      .string()
      .required('Event type is required!')
      .oneOf([eventType.minor, eventType.warning, eventType.important]),
    eventDate: yup.date().required('Event date is required!').typeError('Event date is required!'),
  })
  .required();
