import axios from "axios";
import { Component } from "react";
import CatModel from "../../../Models/CatModel";
import "./CatList.css";

interface CatListState {
    cats: CatModel[];
}

class CatList extends Component<{}, CatListState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            cats: []
        };
    }

    // https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json

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
                            <th>ACTION <button>➕</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cats.map(c =>
                            <tr>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.weight}</td>
                                <td>{c.color}</td>
                                <td>
                                    <img className="catImage" src={c.image} alt={c.name} />
                                </td>
                                <td>
                                    <button>📝</button>
                                    <button>🗑️</button>
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
