import { Button, InputField } from "../../components/form control";
import { AuthLayout } from "../../layouts";
import { Formik } from "formik";
import * as Yup from "yup";
import queries from "../../services/queries/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Please enter your password"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function Page() {
  const { mutate, isLoading } = queries.login();

  return (
    <AuthLayout>
      <div className="app__auth__form_container">
        <div className="app__auth__form_container__header">
          <h4 className="app__auth__form_container__h4">Welcome Back!</h4>

          <p className="app__auth__form_container__p">
            Sign in to your Xpress reward partner's dashboard
          </p>
        </div>

        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={mutate}
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
                <form className="app__login_form" onSubmit={handleSubmit}>
                  <InputField
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                  />

                  <div className="app__login_form__password">
                    <InputField
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                    />

                    <p className="app__login_form__password__fgt">
                      Forgot Password?
                      <span>Reset it</span>
                    </p>
                  </div>

                  <Button isLoading={isLoading} title="Sign in" type="submit" />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </AuthLayout>
  );
}
