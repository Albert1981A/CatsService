import axios from "axios";
import { Component } from "react";
import { NavLink, useHistory } from "react-router-dom";
import CatModel from "../../../Models/CatModel";
import { CatsAppState, catsDeletedAction, catsDownloadedAction } from "../../../Redux/CatsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import Card from "../Card/Card";
import "./CatCards.css";

interface CatCardsState {
    cats: CatModel[];
}

class CatCards extends Component<{}, CatCardsState> {

    public constructor(props: {}) {
        super(props)
        this.state = {
            cats: store.getState().catState.cats
        };
    }

    public async componentDidMount() {
        if (store.getState().catState.cats.length == 0) {
            try {
                const response = await axios.get<CatModel[]>(globals.urls.cats);
                // store.dispatch(catsDownloadedAction(response.data)); // updating AppState (global state)
                store.dispatch(catsDownloadedAction(response.data));
                this.setState({ cats: response.data }); // updating the local state
            }
            catch (err) {
                alert(err.message);
            }
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CatCards">
                <h2>Our list of cats for adoption</h2>
                <h2>Add Cat <NavLink to="/addCat" exact><button>➕</button></NavLink></h2>

                {this.state.cats.length === 0 && <EmptyView msg="No cats for you!" />}
                {this.state.cats.length !== 0 && this.state.cats.map(c => <Card key={c.id} cat={c} />)}
            </div>
        );
    }
}

export default CatCards;
