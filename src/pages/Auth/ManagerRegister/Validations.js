/* eslint-disable prettier/prettier */
import * as Yup from 'yup';

const scheme = Yup.object().shape({
  email: Yup.string()
    .required('Please enter email address')
    .email('Please enter valid email address'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
  cpassword: Yup.string()
    .required('Please enter your password.')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .test('password-match', 'Passwords do not match.', function (value) {
      return value === this.parent.password;
    }),
});

export default scheme;
