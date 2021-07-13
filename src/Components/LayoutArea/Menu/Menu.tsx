import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home" exact>HOME</NavLink>
            <br />
            <NavLink to="/cats" exact>CATS</NavLink>
            <br />
            <NavLink to="/about" exact>ABOUT</NavLink>
        </div>
    );
}

export default Menu;
