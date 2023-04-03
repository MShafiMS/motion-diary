import Nav from "./Components/shared/Nav";
const Layout = ({ children }) => {
  return (
    <div className="bg-white">
      <Nav />
      {children}
    </div>
  );
};
export default Layout;
