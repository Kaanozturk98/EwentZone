// Components
import RibbonCategory from "components/RibbonCategory";

export default function Ribbon() {
  return (
    <div className="bg-primary-100 h-20 w-screen my-6">
      <div className="h-full flex items-center justify-center gap-x-4">
        <RibbonCategory
          label="Sanat"
          backgroundImage="https://classbento.co.uk/images/general/swirls/150h/03.png"
        />
        <RibbonCategory
          label="Güzellik ve Bakım"
          backgroundImage="https://classbento.co.uk/images/general/swirls/150h/22.png"
        />
        <RibbonCategory
          label="Mutfak"
          backgroundImage="https://classbento.co.uk/images/general/swirls/150h/08.png"
        />
        <RibbonCategory
          label="El işi"
          backgroundImage="	https://classbento.co.uk/images/general/swirls/150h/14.png"
        />
        <RibbonCategory
          label="Çiçekler ve Ağaçlar"
          backgroundImage="https://classbento.co.uk/images/general/swirls/150h/10.png"
        />
        <RibbonCategory
          label="Kil ve Seramik"
          backgroundImage="	https://classbento.co.uk/images/general/swirls/150h/05.png"
        />
      </div>
    </div>
  );
}
