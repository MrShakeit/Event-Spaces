import Topbar from "./navbar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
};

export default Layout;
