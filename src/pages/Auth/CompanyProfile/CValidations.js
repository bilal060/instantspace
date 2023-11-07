import * as Yup from "yup";

const scheme = Yup.object().shape({
   
    cName: Yup.string()
        .required("Please enter company name"),
       
        noOFTruck: Yup.string()
        .required("Please enter truck drivers"),
        phone: Yup.string()
        // .test("checkPhoneNumber", (value, obj) =>
        //     validateNumberRegex(regex, value || "", obj)
        // )
        .required("Phone number is required."),
        cAddress: Yup.string()
        .required("Please enter company address"),
        truckType: Yup.string()
        .required("Please enter truck type"),
});

export default scheme;
