import axios from "axios";
import { Component } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import CatModel from "../../../Models/CatModel";
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
            const id = this.props.match.params.id;
            const response = await axios.get<CatModel>("https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cat-single.json") //+id
            this.setState({ cat: response.data });
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
                        <img src={this.state.cat.image} />
                        <br /><br />
                        <NavLink to="/cats-2" exact>Back</NavLink>
                    </>
                }
            </div>
        );
    }
}

export default CatDetails;
