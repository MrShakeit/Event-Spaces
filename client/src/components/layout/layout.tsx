import { AboutUs } from "./footer";
import Topbar from "./navbar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Topbar />
      {children}
      <AboutUs />
    </div>
  );
};

export default Layout;
