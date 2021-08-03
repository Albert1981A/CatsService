import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CatModel from "../../../Models/CatModel";
import { catsDeletedAction, catsDownloadedAction } from "../../../Redux/CatsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import "./Card.css";

interface CardProps {
    cat: CatModel;
}

interface CatListState {
    cats: CatModel[];
}

class Card extends Component<CardProps, CatListState> {

    public constructor(props: CardProps) {
        super(props);
        this.state = {
            cats: store.getState().catState.cats
        }
    }

    public async componentDidMount() {
        if (store.getState().catState.cats.length == 0) {
            try {
                const response = await axios.get<CatModel[]>(globals.urls.cats);
                // store.getState().catState.cats = response.data; // updating AppState (global state)
                store.dispatch(catsDownloadedAction(response.data)); // updating AppState (global state)
                this.setState({ cats: response.data }); // updating the local state
            }
            catch (err) {
                alert(err.message);
            }
        }
    }

    private async deleteCat(id: number) {
        const result = window.confirm("Are you sure you want to delete cat id - " + id + "?");
        if (result) {
            try {
                const response = await axios.delete<any>(globals.urls.cats + id);
                // store.getState().catState.cats = store.getState().catState.cats.filter(c => c.id !== id); // updating AppState (global state)
                store.dispatch(catsDeletedAction(id)); // updating AppState (global state)
                this.setState({ cats: store.getState().catState.cats }); // updating the local state
                
            } catch (err) {
                alert(err.message);
            }
        }
    }

    public render(): JSX.Element {
        return (
            <div className="Card">
                <div>
                    {this.props.cat.name} <br />
                    cat id: {this.props.cat.id}<br />
                    Weight: {this.props.cat.weight} <br />
                    Color: {this.props.cat.color} <br />
                </div>

                <div>

                    <NavLink to={"cats-2/details/" + this.props.cat.id} exact>
                        <img src={globals.urls.cats + "images/" + this.props.cat.image} alt={this.props.cat.name} /><br />
                    </NavLink>

                    <button>📝</button>
                    <button onClick={() => this.deleteCat(this.props.cat.id)}>🗑️</button>
                </div>
            </div>
        );
    }
}

export default Card;
