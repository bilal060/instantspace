/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
import {validateNumberRegex} from '../../../utils/methods';

const scheme = Yup.object().shape({
  fullName: Yup.string().required('Please enter full a name'),
  bio: Yup.string().required('Please enter bio'),
  phone: Yup.string()
    // .test("checkPhoneNumber", (value, obj) =>
    //     validateNumberRegex(regex, value || "", obj)
    // )
    .required('Phone number is required.')
    .min(9, 'Number is too short - should be 9 chars minimum.'),
});

export default scheme;
