import { Button, InputField, Select } from "../../components/form control";
import { AuthLayout } from "../../layouts";
import { Formik } from "formik";
import * as Yup from "yup";
import { FileDrop } from "react-file-drop";
import { useRef, useState } from "react";
import { PendingModal, RenderIf } from "../../components";
import { Attach, Cloud } from "../../components/svg";
import { toast } from "react-toastify";
import queries from "../../services/queries/auth";

const validationSchema = Yup.object().shape({
  business_name: Yup.string().required("Please enter business name"),
  business_email: Yup.string()
    .required("Please enter business email")
    .email("Please enter a valid email address"),
  business_phone: Yup.string().required("Please enter business phone mnumber"),
  business_category: Yup.string().required("Please select business category"),
  account_no: Yup.string().required("Please enter your account no"),
});

const validationSchema2 = Yup.object().shape({
  contact_name: Yup.string().required("Please enter contact name"),
  contact_phone: Yup.string().required("Please enter contact phone mnumber"),
  contact_email: Yup.string().required("Please enter contact email address"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
  state: Yup.string().required("Please select state"),
  city: Yup.string().required("Please enter city"),
  street: Yup.string().required("Enter street number"),
  house_number: Yup.string().required("Enter house number"),
});

const initialValues = {
  business_name: "",
  business_email: "",
  business_phone: "",
  business_category: "",
  account_no: "",
};

const initialValues2 = {
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  password: "",
  confirmPassword: "",
  state: "",
  city: "",
  street: "",
  house_number: "",
};

type InitialValues = ReturnType<() => typeof initialValues>;
type InitialValues2 = ReturnType<() => typeof initialValues2>;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [firstPageActive, setFirstPageActive] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isLoading, status } = queries.create()

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files === null) return;
    const currentFile = files[0];
    if (!currentFile) return;
    if (currentFile.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the limit (10MB)");
    } else {
      setFile(files[0]);
    }
  };

  const onTargetClick = () => {
    fileInputRef?.current?.click();
  };

  const onSubmit = (_values: InitialValues) => {
    setFirstPageActive(false);
    window.scrollTo(0, 0)
  };

  const onSubmit2 = (_values: InitialValues2) => {
    mutate(_values)
  };

  return (
    <AuthLayout>
      <RenderIf condition={status === 'idle' || status === 'loading'}>
        <div className="app__auth__form_container">
          <div className="app__auth__form_container__header">
            <h4 className="app__auth__form_container__h4">
              Welcome to Xpress Rewards
            </h4>

            <p className="app__auth__form_container__p">
              Complete the form below to get started
            </p>
          </div>

          <div className="app__auth__form__divider"></div>

          <RenderIf condition={firstPageActive}>
            <p className="app__auth_subtitle font-inter mb-3">
              Business Information
            </p>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(props) => {
                  const {
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched,
                  } = props;
                  return (
                    <form
                      className="app__login_form gap-3"
                      onSubmit={handleSubmit}
                    >
                      <InputField
                        name="business_name"
                        type="text"
                        id="business_name"
                        placeholder=""
                        label="Business name"
                        value={values.business_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                      <InputField
                        name="business_email"
                        type="email"
                        id="business_email"
                        placeholder=""
                        label="Business Email Address"
                        value={values.business_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                      <InputField
                        name="business_phone"
                        type="text"
                        id="business_phone"
                        placeholder=""
                        label="Business Phone Number"
                        value={values.business_phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                      <Select
                        label="Business Category"
                        options={["Category A", "Category B"]}
                        disabledValue={" "}
                        name="business_category"
                        id="business_category"
                        value={values.business_category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                      <InputField
                        name="account_no"
                        type="text"
                        id="account_no"
                        placeholder=""
                        label="Account No"
                        value={values.account_no}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                      <div className="app__login_form__password">
                        <div className="app__form__field ">
                          <label>Image (Logo)</label>
                          <FileDrop
                            onDrop={(files) => {
                              if (files === null) return;
                              const currentFile = files[0];
                              if (currentFile.size > MAX_FILE_SIZE) {
                                toast.error("File size exceeds the limit (10MB)");
                              } else {
                                setFile(files[0]);
                              }
                            }}
                            onTargetClick={onTargetClick}
                          >
                            <div className="app__auth__file__drop">
                              <div className="d-flex justify-content-center">
                                <Cloud />
                              </div>
                              <h4 className="text-center app__auth__file__drop__text mt-2 mb-3">
                                Drag here or click the button below to upload
                              </h4>

                              <div className="d-flex justify-content-center align-items-center">
                                <div className="d-flex align-items-center">
                                  <Button
                                    className="d-flex gap-2 align-items-center app__auth__attach_btn"
                                    type="button"
                                  >
                                    <Attach />
                                    Choose file
                                  </Button>
                                </div>
                              </div>

                              <RenderIf condition={file !== null}>
                                <p className="text-center app__auth__file__drop__text lg mt-3">
                                  {file?.name}
                                </p>
                              </RenderIf>

                              <RenderIf condition={file === null}>
                                <p className="text-center app__auth__file__drop__text lg mt-3">
                                  Maximum upload size: 10MB (.jpg)
                                </p>
                              </RenderIf>
                            </div>
                          </FileDrop>
                          <input
                            onChange={onFileInputChange}
                            ref={fileInputRef}
                            type="file"
                            className="hidden d-none"
                          />
                        </div>
                      </div>

                      <div className="d-flex app__auth__sign__uo__btn align-items-center gap-3">
                        <div className="">
                          <Button title="Next" className="px-4" type="submit" />
                        </div>
                        <p>Step 1 of 2</p>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </RenderIf>

          <RenderIf condition={!firstPageActive}>
            <p className="app__auth_subtitle font-inter mb-3">Business Address</p>

            <div>
              <Formik
                initialValues={initialValues2}
                validationSchema={validationSchema2}
                onSubmit={onSubmit2}
              >
                {(props) => {
                  const {
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched,
                  } = props;
                  return (
                    <form
                      className="app__login_form gap-3"
                      onSubmit={handleSubmit}
                    >
                      <div className="d-flex align-items-start gap-3">
                        <div className="w-100">
                          <InputField
                            name="house_number"
                            type="text"
                            id="house_number"
                            placeholder=""
                            label="House Number"
                            value={values.house_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className="w-100">
                          <InputField
                            name="street"
                            type="text"
                            id="street"
                            placeholder=""
                            label="Street"
                            value={values.street}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>

                      <div className="d-flex align-items-start gap-3">
                        <div className="w-100 pt-1">
                          <InputField
                            name="city"
                            type="text"
                            id="city"
                            placeholder=""
                            label="City"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className="w-100">
                          <Select
                            label="State"
                            options={["Oyo", "Ogun"]}
                            disabledValue={" "}
                            name="state"
                            id="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>

                      <p className="app__auth_subtitle font-inter">
                        Contact Person Information
                      </p>

                      <InputField
                        name="contact_name"
                        type="text"
                        id="contact_name"
                        placeholder=""
                        label="Contact Name"
                        value={values.contact_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                      <InputField
                        name="contact_phone"
                        type="text"
                        id="contact_phone"
                        placeholder=""
                        label="Contact Phone Number"
                        value={values.contact_phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                      <InputField
                        name="contact_email"
                        type="text"
                        id="contact_email"
                        placeholder=""
                        label="Contact Email Address"
                        value={values.contact_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                      <p className="app__auth_subtitle font-inter">Password</p>
                      <div className="app__login_form__password">
                        <InputField
                          name="password"
                          id="password"
                          type="password"
                          placeholder=""
                          label="Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                        />

                        <InputField
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          placeholder=""
                          label="Confirm Password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                        />
                      </div>

                      <div className="d-flex app__auth__sign__uo__btn align-items-center gap-3">
                        <div className="">
                          <Button title="Submit" className="px-4 d-flex justify-content-center align-items-center" type="submit" isLoading={isLoading} />
                        </div>
                        <p>Step 2 of 2</p>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </RenderIf>
        </div>
      </RenderIf>

        <RenderIf condition={status === 'success' || status === 'error'}>
          <PendingModal />
        </RenderIf>
    </AuthLayout>
  );
}
