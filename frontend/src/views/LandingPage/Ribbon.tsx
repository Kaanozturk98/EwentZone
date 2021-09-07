export default function Ribbon() {
  return (
    <div className="bg-primary-100 h-20 w-screen">
      <div
        className="flex items-center justify-between h-full"
        style={{ padding: "0 64px" }}
      >
        <div className="text-primary-500 text-2xl font-bold">
          4.8 &#9733; (2,100+ reviews)
        </div>
        <div className="flex gap-x-10">
          <div className="text-primary-500 text-2xl font-bold flex items-center">
            As seen on
          </div>
          <img
            className="h-10"
            src="https://classbento.co.uk/images/general/partner_logos/mulberry/this_morning.png"
          />
          <img
            className="h-10"
            src="https://classbento.co.uk/images/general/partner_logos/mulberry/the_guardian.png"
          />
          <img
            className="h-10"
            src="https://classbento.co.uk/images/general/partner_logos/mulberry/gq.png"
          />
        </div>
        <div className="flex gap-x-5">
          <div className="text-primary-500 text-2xl font-bold flex items-center">
            Supporting
          </div>
          <img
            className="h-16"
            src="https://classbento.co.uk/images/general/partner_logos/mulberry/mental-health-uk.png"
          />
        </div>
      </div>
    </div>
  );
}
