import { useState } from "react";
// Assests
import CompanyLogo from "assets/EwentZoneLogo.png";
// Components
import Button from "components/Button";
import InputField from "components/InputField";
import Popup from "components/Popup";
// Icons
import { RiUserFill, RiUserAddFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
// Views
import SignUp from "views/SignUp";
import SignIn from "views/SignIn";

export default function HomeNavbar() {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e: any) => setSearchInput(e.target.value);

  return (
    <div className="bg-white">
      <div className="container mx-auto h-24 flex items-center justify-between">
        <a href="#">
          <img className="w-auto h-10" src={CompanyLogo} />
        </a>

        <InputField
          id="ara"
          label="Atölye Ara"
          className="hidden lg:inline w-screen-1/6 min-w-50"
          icon={<BiSearchAlt size={24} />}
          value={searchInput}
          onChange={handleChange}
        />

        <nav className="flex gap-x-8 text-sm font-semibold">
          <Button id="atolyeleri_incele" label="Atolyeleri İncele" />

          <Popup title="Giriş Yap" body={<SignIn />}>
            <button className="flex items-center gap-x-2 text-opacity-90 text-gray-600 transition-all hover:text-gray-700 hover:text-opacity-100">
              <div>
                <RiUserFill size={24} />
              </div>
              <div className="hidden md:block">Giriş Yap</div>
            </button>
          </Popup>

          <Popup title="Kayıt Ol" body={<SignUp />}>
            <button className="flex items-center gap-x-2 text-opacity-90 text-gray-600 transition-all hover:text-gray-700 hover:text-opacity-100">
              <div>
                <RiUserAddFill size={24} />
              </div>
              <div className="hidden md:block">Kayıt Ol</div>
            </button>
          </Popup>

          <a
            href="#"
            className="group flex items-center gap-x-2 text-opacity-90 text-gray-600 transition-all hover:text-gray-700 hover:text-opacity-100"
          >
            <div>
              <MdFavorite size={24} />
            </div>
            <div className="hidden lg:block group-hover:block">Favorilerim</div>
          </a>
        </nav>
      </div>
    </div>
  );
}
