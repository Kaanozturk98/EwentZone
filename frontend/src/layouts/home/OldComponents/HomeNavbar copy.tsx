export default function HomeNavbar() {
  return (
    <div className="bg-babyPowder">
      <div className="container mx-auto h-24 flex items-center justify-between">
        <a href="#">
          <img
            className="w-44 h-10"
            src="https://classbento.co.uk/images/general/logo/wide-mulberry-classbento-logo-186.png"
          />
        </a>

        <nav className="flex gap-x-8 text-lg font-bold">
          <a
            href="#"
            className="text-opacity-90 text-spaceShuttle transition-all hover:text-primary hover:text-opacity-100"
          >
            Classes
          </a>

          <a
            href="#"
            className="text-opacity-90 text-spaceShuttle transition-all hover:text-primary hover:text-opacity-100"
          >
            Gifts
          </a>

          <a
            href="#"
            className="text-opacity-90 text-spaceShuttle transition-all hover:text-primary hover:text-opacity-100"
          >
            Teach
          </a>

          <a
            href="#"
            className="text-opacity-90 text-spaceShuttle transition-all hover:text-primary hover:text-opacity-100"
          >
            Contact
          </a>

          <a
            href="#"
            className="text-spaceShuttle text-opacity-90 transition-all hover:text-primary hover:text-opacity-100"
          >
            Login
          </a>
        </nav>
      </div>
    </div>
  );
}
