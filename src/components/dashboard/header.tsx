import React from "react";
import { Alert, ChevronDown } from "../svg";
import ProfilePicture from '../../images/profile-picture.png'

export default function Header() {

  return (
    <div className="wema__dashboard__header">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex gap-2 align-items-center wema__dashboard__header__page__title">
          <h3 className="font-inter">Verifier</h3>
          <p className="">11</p>
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
  )
}