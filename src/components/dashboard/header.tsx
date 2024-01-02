import { Alert, ChevronDown } from "../svg";
import ProfilePicture from "../../images/profile-picture.png";
import queries from "../../services/queries/verifiers";
import { useSearchQueries } from "../../pages/dashboard";


export default function Header() {
  const query = useSearchQueries();

  const { data } = queries.read({ query });

  return (
    <div className="wema__dashboard__header">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex gap-2 align-items-center wema__dashboard__header__page__title">
          <h3 className="font-inter">Verifier</h3>
          <p className="">{data?.length || 0}</p>
        </div>

        <div className="d-flex gap-4 align-items-center">
          <Alert />

          <div className="d-flex gap-2 align-items-center">
            <div className="wema__dashboard__header__profile__pic">
              <img src={ProfilePicture} alt="profile" />
            </div>
            <ChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
}
