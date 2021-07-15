import { Component } from "react";
import { NavLink } from "react-router-dom";
import CatModel from "../../../Models/CatModel";
import "./Card.css";

interface CardProps {
    cat: CatModel;
}

class Card extends Component<CardProps> {

    public constructor(props: CardProps) {
        super(props);
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
                        <img src={this.props.cat.image} alt={this.props.cat.name} /><br />
                    </NavLink>

                    <button>📝</button>
                    <button>🗑️</button>
                </div>
            </div>
        );
    }
}

export default Card;
