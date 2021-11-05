import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";

export default function HomeLayout({ children }: any) {
  return (
    <div style={{ height: "100%" }}>
      <HomeNavbar />
      <div style={{ height: "100%" }}>{children}</div>
      <Footer />
    </div>
  );
}
