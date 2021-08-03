import axios from "axios";
import { Component } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import CatModel from "../../../Models/CatModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import "./CatDetails.css";

interface RouteParam {
    id: string;
}

interface CatDetailsProps extends RouteComponentProps<RouteParam> {

}

interface CatDetailsState {
    cat: CatModel;
}

class CatDetails extends Component<CatDetailsProps, CatDetailsState> {

    public constructor(props: CatDetailsProps) {
        super(props);
        this.state = {
            cat: null
        };
    }

    public async componentDidMount() {
        try {
            const id = +this.props.match.params.id;
            const cat = store.getState().catState.cats.find((p) => p.id === id);
            // const response = await axios.get<CatModel>(globals.urls.cats + id); -----> Not Needed!!!
            this.setState({ cat });
        } catch (err) {
            alert(err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CatDetails Box">
                <h2>Cat details</h2>
                {
                    this.state.cat &&
                    <>			<h2>Details</h2>
                        <h3>Name: {this.state.cat.name}</h3>
                        <h3>Weight: {this.state.cat.weight}</h3>
                        <h3>Color: {this.state.cat.color}</h3>
                        <img src={globals.urls.cats + "images/" + this.state.cat.image} />
                        <br /><br />
                        <NavLink to="/cats-2" exact>Back</NavLink>
                    </>
                }
            </div>
        );
    }
}

export default CatDetails;

// 00:38
