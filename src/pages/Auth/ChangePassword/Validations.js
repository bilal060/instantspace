import * as Yup from "yup";

const scheme = Yup.object().shape({
   

    password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  cpassword: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .test('password-match', 'Passwords do not match.', function (value) {
      return value === this.parent.password;
    }),

});

export default scheme;
