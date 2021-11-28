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
    (Math.floor((useWindowDimensions().width - (160 + 36)) / 256) || 1) * 3;

  function makeArr(startValue: number, stopValue: number, cardinality: number) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + step * i);
    }
    return arr;
  }

  console.log(
    "card #",
    makeArr(0, numberOfCards - 1, numberOfCards),
    numberOfCards,
    useWindowDimensions().width - (160 + 36)
  );

  return (
    <div className="xl:container mx-6 xl:mx-auto h-auto my-20">
      <div className="text-spaceShuttle text-4xl font-bold mb-8">
        Popüler Atölyeler
      </div>
      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
