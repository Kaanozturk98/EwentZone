import { useState } from "react";
// Assests
import CompanyLogo from "assets/EwentZone.png";
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
import useAuth from "guards/authProvider";

export default function HomeNavbar() {
  const { user } = useAuth();

  console.log("user", user);

  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e: any) => setSearchInput(e.target.value);

  return (
    <div className="bg-babyPowder">
      <div className="xl:container mx-6 xl:mx-auto h-24 flex items-center justify-between">
        <a href="#">
          <img className="w-auto h-5" src={CompanyLogo} />
        </a>

        <InputField
          id="ara"
          label="Atölye Ara"
          className={{
            parent: "hidden md:block",
            input: "w-full min-w-50 bg-woodSmoke",
          }}
          icon={<BiSearchAlt size={24} className="text-primary" />}
          value={searchInput}
          onChange={handleChange}
        />

        <nav className="flex gap-x-8 text-sm font-semibold">
          <Button
            className="hidden lg:inline"
            id="atolyeleri_incele"
            label="Atolyeleri İncele"
          />

          {user ? (
            <>
              <Popup title="Profilim" body={<SignIn />}>
                <a className="group flex items-center gap-x-2 text-opacity-90 text-spaceShuttle transition-all hover:text-spaceShuttle hover:text-opacity-100 cursor-pointer">
                  <div>
                    <RiUserFill size={24} className="text-primary" />
                  </div>
                  <div className="hidden md:block group-hover:block">
                    {user.name}
                  </div>
                </a>
              </Popup>

              <Popup title="Sepetim" body={<SignUp />}>
                <a className="group flex items-center gap-x-2 text-opacity-90 text-spaceShuttle transition-all hover:text-spaceShuttle hover:text-opacity-100 cursor-pointer">
                  <div>
                    <RiUserAddFill size={24} className="text-primary" />
                  </div>
                  <div className="hidden md:block group-hover:block">
                    Sepetim
                  </div>
                </a>
              </Popup>
            </>
          ) : (
            <>
              <Popup title="Giriş Yap" body={<SignIn />}>
                <a className="group flex items-center gap-x-2 text-opacity-90 text-spaceShuttle transition-all hover:text-spaceShuttle hover:text-opacity-100 cursor-pointer">
                  <div>
                    <RiUserFill size={24} className="text-primary" />
                  </div>
                  <div className="hidden md:block group-hover:block">
                    Giriş Yap
                  </div>
                </a>
              </Popup>

              <Popup title="Kayıt Ol" body={<SignUp />}>
                <a className="group flex items-center gap-x-2 text-opacity-90 text-spaceShuttle transition-all hover:text-spaceShuttle hover:text-opacity-100 cursor-pointer">
                  <div>
                    <RiUserAddFill size={24} className="text-primary" />
                  </div>
                  <div className="hidden md:block group-hover:block">
                    Kayıt Ol
                  </div>
                </a>
              </Popup>
            </>
          )}

          <a
            href="#"
            className="group flex items-center gap-x-2 text-opacity-90 text-spaceShuttle transition-all hover:text-spaceShuttle hover:text-opacity-100 cursor-pointer"
          >
            <div>
              <MdFavorite size={24} className="text-primary" />
            </div>
            <div className="hidden lg:block group-hover:block">Favorilerim</div>
          </a>
        </nav>
      </div>
    </div>
  );
}
