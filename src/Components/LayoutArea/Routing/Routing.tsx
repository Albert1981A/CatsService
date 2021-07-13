import { Redirect, Route, Switch } from "react-router-dom";
import CatList from "../../CatsArea/CatList/CatList";
import About from "../../MenuArea/About/About";
import Page404 from "../../SharedArea/Page404/Page404";
import Main from "../Main/Main";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/home" component={Main} exact />
                <Route path="/cats" component={CatList} exact />
                <Route path="/about" component={About} exact />
                <Redirect from="/" to="/home" exact/>
                <Route component={Page404}/> {/* Last */}
            </Switch>
        </div>
    );
}

export default Routing;
