import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import CatModel from "../../../Models/CatModel";
import CatPayLoadModel from "../../../Models/CatPayLoadModel";
import "./addCat.css";
import { FormControl } from '@material-ui/core';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import globals from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { catsAddedAction } from "../../../Redux/CatsState";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

function AddCat(): JSX.Element {

    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<CatPayLoadModel>();
    const history = useHistory();

    async function send(cat: CatPayLoadModel) {
        console.log(cat);
        try {
            const formData = new FormData();
            formData.append("name", cat.name);
            formData.append("weight", cat.weight.toString());
            formData.append("color", cat.color);
            formData.append("birthday", cat.birthday.toString());
            formData.append("image", cat.image.item(0));
            const response = await axios.post<CatModel>(globals.urls.cats, formData);
            const added = response.data;
            store.dispatch(catsAddedAction(added));
            alert("Cat has been added");
            history.push("/cats-2")
        } catch (err) {
            console.log(err.massage);
        }
    }

    return (
        <div className="addCat Box2">
            <h2>Add Cat</h2>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(send)}>

                <TextField
                    id="outlined-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    type="text" name="name"
                    {...register("name", {
                        required: true,
                        minLength: 2
                    })
                    }
                />
                {errors.name?.type === "required" && <span>Missing name</span>}
                {errors.name?.type === "minLength" && <span>Name is to short</span>}
                <br />
                <br />

                {/* <label>Name: &nbsp;</label>
                <input type="text" name="name"
                    {...register("name", {
                        required: true,
                        minLength: 2
                    })
                    } />
                <br />
                {errors.name?.type === "required" && <span>Missing name</span>}
                {errors.name?.type === "minLength" && <span>Name is to short</span>}
                <br />
                <br /> */}

                <label>Weight: &nbsp;</label>
                <input type="number" name="weight" step="0.01"
                    {...register("weight",
                        {
                            required: { value: true, message: "Missing weight" },
                            min: { value: 0, message: "Weight must be grater than zero" }
                        })
                    } />
                <br />
                <span>{errors.weight?.message}</span>
                <br />
                <br />

                {/* <label>Color: &nbsp;</label>
                <input type="text" name="color" {...register("color", { required: true })} />
                <br />
                {errors.color && <span>Missing color</span>}
                <br />
                <br /> */}

                <label>Color: &nbsp;</label>
                <select name="color" {...register("color", { required: true })}>
                    <option value="" disabled selected>Choose color</option>
                    <option value="BROWN">Brown</option>
                    <option value="GRAY">Gray</option>
                    <option value="REDDISH">Reddish</option>
                </select>
                <br />
                {errors.color && <span>Missing color</span>}
                <br />
                <br />

                    <label>Birthday: &nbsp;</label>
                    <input type="date" name="birthday" {...register("birthday", { required: true })} />
                    <br />
                    {errors.birthday && <span>Missing birthday</span>}
                    <br />
                    <br />

                    <label>Image: &nbsp;</label>
                    <input type="file" name="image" {...register("image", { required: true })} />
                    <br />
                    {errors.image && <span>Missing image</span>}
                    <br />
                    <br />

                    <button>Add</button>

            </form>
                <br />

                <NavLink to="/cats-2" exact>Go Back</NavLink>


        </div>
            );
}

            export default AddCat;
