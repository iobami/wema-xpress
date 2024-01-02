import { useNavigate } from "react-router-dom";
import { routes } from "../../navigation";
import { Button } from "../form control";
import { IconPending } from "../svg";



export default function PendingModal() {
  const navigate = useNavigate();

  return (
    <div className="app__auth__pending__modal">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center">
          <div className="app__auth__pending__modal__icon">
            <IconPending />
          </div>
          <p className="app__auth__pending__modal__icon__text text-center mt-2">Pending</p>
        </div>
        <p className="app__auth__pending__modal__details text-center mt-4">
        Your registration is awaiting approval from our partnership team
        </p>

        <div className="w-100">
          <Button className="d-flex align-items-center justify-content-center mt-5"
            onClick={()=>{
              navigate(routes.dashboard.entry.path)
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}