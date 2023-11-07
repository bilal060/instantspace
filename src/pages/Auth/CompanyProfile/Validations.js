import * as Yup from "yup";

const scheme = Yup.object().shape({
   
        truckType: Yup.string()
        .required("Please enter truck type"),
        cLicenseNo: Yup.string()
        .required("Please enter company licenseNo"), 
        cName: Yup.string()
        .required("Please enter company Name"), 
        cAddress: Yup.string()
        .required("Please enter company address"),
        phone: Yup.string()
        // .test("checkPhoneNumber", (value, obj) =>
        //     validateNumberRegex(regex, value || "", obj)
        // )
        .required("Phone number is required."),

});

export default scheme;
