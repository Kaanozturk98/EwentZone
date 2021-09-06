import HomeNavbar from "./HomeNavbar";
export default function HomeLayout({ children }: any) {
  return (
    <div style={{ height: "100%" }}>
      <HomeNavbar />
      <div style={{ height: '100%' }}>{children}</div>
    </div>
  );
}
