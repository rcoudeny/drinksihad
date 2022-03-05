import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserContext } from "../../components/App/contexts";
import { LoginDTO } from "../../models/UserDTO";
import ApiService from "../../service/api.service";
import { ROUTE_REGISTER } from "../../service/constants";
import UserService from "../../service/user.service";

export default function Login() {
    const userContext = useContext(UserContext);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        let loginDTO: LoginDTO = {
            email: data.email,
            password: data.password,
        };
        // TODORC: add checks
        UserService.login(loginDTO).then(function (response: string) {
            let user = ApiService.currentUser();
            if (user) {
                userContext.login(user);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Log in</h1>
            <input {...register("email", { required: true })} placeholder="email" />
            <input {...register("password", { required: true })} placeholder="password" type='password' />
            <input type="submit" />
        </form>
        <Link to={"/" + ROUTE_REGISTER}>Don't have an account yet? Register here</Link>
    </div>
}