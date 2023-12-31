import * as Yup from "yup";

const scheme = Yup.object().shape({
    otp: Yup.string()
        .required("Please enter  email otp code"),
       

});

export default scheme;
