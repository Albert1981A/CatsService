import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import CatModel from "../../../Models/CatModel";
import { catsDeletedAction, catsDownloadedAction } from "../../../Redux/CatsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import "./CatList.css";

interface CatListState {
    cats: CatModel[];
}

class CatList extends Component<{}, CatListState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            cats: store.getState().catState.cats
        };
    }

    // https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json

    public async componentDidMount() {
        if (store.getState().catState.cats.length == 0) {
            try {
                const response = await axios.get<CatModel[]>(globals.urls.cats);
                // store.getState().catState.cats = response.data; // updating AppState (global state)
                store.dispatch(catsDownloadedAction(response.data)); // updating AppState (global state)
                this.setState({ cats: response.data }); // updating the local state
                
                notify.success("Cats for you");
            }
            catch (err) {
                //alert(err.message);
                notify.error(err.massage);
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
            <div className="CatList">
                <h2>Our list of cats for adoption</h2>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>WEIGHT</th>
                            <th>COLOR</th>
                            <th>IMAGE</th>
                            <th>ACTION <NavLink to="/addCat" exact><button>➕</button></NavLink></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cats.map(c =>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.weight}</td>
                                <td>{c.color}</td>
                                <td>
                                    <img className="catImage" src={globals.urls.cats + "images/" + c.image} alt={c.name} />
                                </td>
                                <td>
                                    <button>📝</button>
                                    <button onClick={() => this.deleteCat(c.id)}>🗑️</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* {this.state.cats.map(c => <span key={c.id}>Cats: {c.id} - name: {c.name} - Color: {c.color} - Weight: {c.weight};<br /> </span>)} */}
            </div>
        );
    }
}

export default CatList;
