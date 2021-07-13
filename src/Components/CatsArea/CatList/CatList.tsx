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
			cats:[]
        };
    }

    // https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json

    public async componentDidMount() { 
        try{
            const response = await axios.get<CatModel[]>('https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json');
            this.setState({cats: response.data});
        }
        catch(err){
            alert(err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CatList">
                <h2>Our list of cats for adoption</h2>
				{this.state.cats.map(c => <span key={c.id}>Cats: {c.id} - name: {c.name} - Color: {c.color} - Weight: {c.weight};<br /> </span>)}
            </div>
        );
    }
}

export default CatList;
