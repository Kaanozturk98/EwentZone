import { TiLocation } from "react-icons/ti";
import { MdLabel, MdFavoriteBorder } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import Button from "./Button";

export default function WorkshopCards(props: { src: string }) {
  const { src } = props;
  return (
    <div className="h-full w-full min-w-60 rounded-lg bg-woodSmoke shadow-xl">
      <div className="relative">
        <a href="#" className="cursor-pointer">
          <img src={src} className="h-52 w-full rounded-t-lg object-cover" />
        </a>

        <a href="#1" className="absolute top-0 right-0 cursor-pointer">
          <div className="p-2">
            <div className="w-8 h-8 bg-babyPowder rounded-full relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <MdFavoriteBorder size={24} className="text-primary" />
              </div>
            </div>
          </div>
        </a>
      </div>

      <div className="flex flex-col p-4 gap-y-4">
        <div>
          <a
            href="#"
            className="cursor-pointer font-medium text-lg text-spaceShuttle-dark"
          >
            Workshop Name
          </a>
        </div>

        <p className="text-spaceShuttle">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            maximus quam in felis iaculis, id consequat purus tristique.
            Vestibulum quis.
          </div>
        </p>

        <div className="flex items-center gap-x-2 text-spaceShuttle">
          <TiLocation size={24} />
          <div>Workshop Location</div>
        </div>

        <div className="flex items-center gap-x-2 text-spaceShuttle">
          <MdLabel size={24} />
          <div>Workshop Price</div>
        </div>

        <div className="flex items-center gap-x-2 text-spaceShuttle">
          <IoMdStar size={24} />
          <div>Workshop Rating</div>
        </div>

        <Button id="sepete_ekle" label="Sepete Ekle" />
      </div>
    </div>
  );
}
