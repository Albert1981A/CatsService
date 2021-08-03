import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { registerAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import "./Register.css";

function Register(): JSX.Element {

    const history = useHistory(); //Redirect function

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<UserModel>({ mode: "onTouched" });
    // console.log(errors);

    async function send(user: UserModel) {
        console.log(user);
        try {
            const response = await axios.post<UserModel>(globals.urls.client + "register", user);
            store.dispatch(registerAction(response.data));
            console.log(response.data);
            notify.success(SccMsg.REGISTER_SUCCESS);
            history.push("/home"); // Redirect to home in success
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Register Box">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(send)}>
                <input
                    type="text"
                    placeholder="First name"
                    {...register("first", {
                        required: { value: true, message: 'Missing First Name' },
                        maxLength: { value: 10, message: 'First name is limit upto 10 Characters' }
                    })}
                />
                <br />
                <span>{errors.first?.message}</span>
                <br />
                <input
                    type="text"
                    placeholder="Last name"
                    {...register("last", {
                        required: { value: true, message: 'Missing Last Name' },
                        maxLength: { value: 10, message: 'Last name is limit upto 10 Characters' }
                    })}
                />
                <br />
                <span>{errors.last?.message}</span>
                <br />
                <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                        required: { value: true, message: 'Missing Email' },
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid Email' }
                    })}
                />
                <br />
                <span>{errors.email?.message}</span>
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: { value: true, message: 'Missing Password' },
                        minLength: { value: 4, message: 'Password should contains at least 4 Characters' },
                        maxLength: { value: 12, message: 'Password should contains up to 12 Characters' },
                    })}
                />
                <br />
                <span>{errors.password?.message}</span>
                <br />
                <select {...register("type", { required: { value: true, message: 'Missing User Type' } })}>
                    <option value="" disabled>User Type</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="EMPLOYEE">Employee</option>
                </select>
                <br />
                <span>{errors.type?.message}</span>
                <input type="submit" disabled={!isDirty || !isValid} value="Register" />

            </form>
            
        </div>
    );
}

export default Register;
