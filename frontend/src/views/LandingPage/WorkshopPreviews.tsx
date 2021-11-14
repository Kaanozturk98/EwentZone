import WorkshopCards from "components/WorkshopCards";
// Icons
import { RiArrowRightSLine } from "react-icons/ri";
// Hooks
import useWindowDimensions from "hooks/useWindowDimensions";

export default function WorkshopPreviews() {
  console.log("useWindowDimensions", useWindowDimensions().width);

  const srcArray = [
    "https://classbento.com.au/images/class/cocktail-and-dumpling-making-class-portrait-big.jpg?1618899626",
    "https://classbento.com.au/images/class/beginners-kintsugi-workshop-portrait-big.jpg?1589940821",
    "https://classbento.com.au/images/class/make-your-own-fragrance-perfume-workshop-0-portrait-big.jpg?1617168533",
    "https://classbento.com.au/images/class/turkish-mosaic-lamp-class-sydney-portrait-big.jpg?1608685632",
  ];

  const numberOfCards =
    Math.floor((useWindowDimensions().width - (160 + 36)) / 256) * 3;

  function makeArr(startValue: number, stopValue: number, cardinality: number) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + step * i);
    }
    return arr;
  }

  /*
  (
    <div className="my-20 h-120">
      <div className="h-full flex items-center justify-center gap-x-4">
        {makeArr(0, numberOfCards - 1, numberOfCards).map((idx) => (  
          <WorkshopCards
            src={
              srcArray[
                idx - Math.floor(idx / srcArray.length) * srcArray.length
              ]
            }
          />
        ))}

        <div className="h-full w-40 flex items-center justify-center">
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
  */

  return (
    <div className="h-auto my-20 mx-10">
      <div className="text-gray-800 text-4xl font-bold mb-8">
        Popüler Atölyeler
      </div>
      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {makeArr(0, numberOfCards - 1, numberOfCards).map((idx) => (
          <WorkshopCards
            src={
              srcArray[
                idx - Math.floor(idx / srcArray.length) * srcArray.length
              ]
            }
          />
        ))}
      </div>
    </div>
  );
}
