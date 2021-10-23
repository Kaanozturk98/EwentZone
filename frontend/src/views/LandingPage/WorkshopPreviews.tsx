import React from "react";
import WorkshopCards from "components/WorkshopCards";
// Icons
import { RiArrowRightSLine } from "react-icons/ri";

export default function WorkshopPreviews() {
  return (
    <div className="w-screen my-20 h-120">
      <div className="h-full flex items-center justify-center gap-x-4">
        <WorkshopCards src="https://classbento.com.au/images/class/cocktail-and-dumpling-making-class-portrait-big.jpg?1618899626" />
        <WorkshopCards src="https://classbento.com.au/images/class/beginners-kintsugi-workshop-portrait-big.jpg?1589940821" />
        <WorkshopCards src="https://classbento.com.au/images/class/make-your-own-fragrance-perfume-workshop-0-portrait-big.jpg?1617168533" />
        <WorkshopCards src="https://classbento.com.au/images/class/turkish-mosaic-lamp-class-sydney-portrait-big.jpg?1608685632" />

        <div className="h-full w-60 flex items-center justify-center">
          <a
            href=""
            className="flex flex-col items-center cursor-pointer text-primary-dark"
          >
            <RiArrowRightSLine size={128} />
            <div>Daha Fazlasını Gör</div>
          </a>
        </div>
      </div>
    </div>
  );
}
