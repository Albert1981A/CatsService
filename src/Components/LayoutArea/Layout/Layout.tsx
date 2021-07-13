import Header from "../Header/Header";
import "./Layout.css";
import Routing from "../Routing/Routing";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Main from "../Main/Main";

function Layout(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="Layout">
        <header>
          <Header />
        </header>
        <aside>
          <Menu />
        </aside>
        <main>
          <Routing />
          {/* <Main/> */}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
