import { Button, InputField } from '../../components/form control';
import { AuthLayout } from '../../layouts';

export default function Page() {
  return (
    <AuthLayout>
      <div className="app__auth__form_container">
        <div className="app__auth__form_container__header">
          <h4 className="app__auth__form_container__h4">
            Welcome to Xpress Rewards
          </h4>

          <p className="app__auth__form_container__p">
            Complete the form below to get started
          </p>
        </div>

        <form className="app__login_form">
          <InputField label="Email Address" />

          <div className="app__login_form__password">
            <InputField label="Password" />

            <p className="app__login_form__password__fgt">
              Forgot Password?

              <span>Reset it</span>
            </p>
          </div>

          <Button title="Sign in" type="submit" />
        </form>
      </div>
    </AuthLayout>
  );
}
