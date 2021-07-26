import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CatModel from "../../../Models/CatModel";
import Card from "../Card/Card";
import "./CatCards.css";

interface CatCardsState {
    cats: CatModel[];
}

class CatCards extends Component<{}, CatCardsState> {

    public constructor(props: {}) {
        super(props)
        this.state = {
            cats: []
        };
    }

    public async componentDidMount() {
        try {
            const response = await axios.get<CatModel[]>('https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json');
            this.setState({ cats: response.data });
        }
        catch (err) {
            alert(err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CatCards">
                <h2>Our list of cats for adoption</h2>
                <h2>Add Cat <NavLink to="/cats-2/addCat" exact>➕</NavLink></h2>

                {this.state.cats.map(c => <Card cat={c} />)}
                
            </div>
        );
    }
}

export default CatCards;
