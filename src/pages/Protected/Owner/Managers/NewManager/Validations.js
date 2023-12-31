/* eslint-disable prettier/prettier */
import * as Yup from 'yup';

const scheme = Yup.object().shape({
  email: Yup.string()
    .required('Please enter email address')
    .email('Please enter valid email address'),

  fullName: Yup.string().required('Please enter full name'),
  phone: Yup.string().required('Please enter phone number'),
});

export default scheme;
