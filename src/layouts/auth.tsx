import { ReactNode } from "react";
import { Logo } from "../components/svg";
import { Button } from "../components/form control";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../navigation";
import { RenderIf } from "../components";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  const location = useLocation();

  const isSignin = location.pathname !== routes.signUp.path;

  return (
    <main className="app__auth">
      <div className="app__auth__header d-flex justify-content-between">
        <div>
          <Logo />
        </div>
        <div className="d-flex align-items-center gap-2">
          <RenderIf condition={!isSignin}>
            <p className="font-inter app__auth__header__text">
              Already have an account?
            </p>
            <div>
              <Link to={routes.signIn.path}>
                <Button variant="outline" className="app__auth__sign__in__btn">
                  Sign in
                </Button>
              </Link>
            </div>
          </RenderIf>

          <RenderIf condition={isSignin}>
            <p className="font-inter app__auth__header__text">
              New to Xpress Rewards?
            </p>
            <div>
              <Link to={routes.signUp.path}>
                <Button variant="outline" className="app__auth__sign__in__btn">
                  Sign Up
                </Button>
              </Link>
            </div>
          </RenderIf>
        </div>
      </div>
      {/* position fixed header here? */}

      <div className="app__auth__main py-4">{children}</div>
    </main>
  );
}
