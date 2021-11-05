import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <div className="mt-20 bg-footer w-screen h-34 py-6 px-12">
      <div className="flex flex-row justify-between">
        <div className="grid grid-cols-3 xs:grid-cols-8 gap-4 text-xs font-light text-white text-opacity-80 w-125 xs:w-200">
          <a href="#">Hakkımızda</a>
          <a href="#">Teslimat ve Satış Noktaları</a>
          <a href="#">Site Haritası</a>
          <a href="#">Çerez Politikası</a>
          <a href="#">Nasıl Çalışır</a>
          <a href="#">İletişim</a>
          <a href="#">KVKK Politikası</a>
          <a href="#">Aydınlatma Metni</a>
        </div>

        <div className="flex flex-row items-center justify-between w-32">
          <a href="#" className="w-8 h-8 bg-white rounded-full">
            <div className="w-6 h-6 m-auto my-1">
              <FiInstagram size={24} style={{ color: "#413d45" }} />
            </div>
          </a>
          <a href="#" className="w-8 h-8 bg-white rounded-full">
            <div className="w-6 h-6 m-auto my-1">
              <FiFacebook size={24} style={{ color: "#413d45" }} />
            </div>
          </a>
          <a href="#" className="w-8 h-8 bg-white rounded-full">
            <div className="w-6 h-6 m-auto my-1">
              <FiYoutube size={24} style={{ color: "#413d45" }} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
