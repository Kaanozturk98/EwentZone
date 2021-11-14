import { TiLocation } from "react-icons/ti";
import { MdLabel } from "react-icons/md";
import { IoMdStar } from "react-icons/io";

export default function WorkshopCards(props: { src: string }) {
  const { src } = props;
  return (
    <a
      href="#"
      className="h-full w-60 rounded-lg bg-lightYellow cursor-pointer"
    >
      <img src={src} className="h-72 w-full rounded-t-lg object-cover" />

      <div className="flex flex-col p-4 gap-y-4">
        <p className="font-medium text-lg text-brown-dark">Workshop Name</p>
        <p className="flex items-center gap-x-2 text-brown">
          <TiLocation size={24} />
          <div>Workshop Location</div>
        </p>
        <p className="flex items-center gap-x-2 text-brown">
          <MdLabel size={24} />
          <div>Workshop Price</div>
        </p>
        <p className="flex items-center gap-x-2 text-brown">
          <IoMdStar size={24} />
          <div>Workshop Rating</div>
        </p>
      </div>
    </a>
  );
}
