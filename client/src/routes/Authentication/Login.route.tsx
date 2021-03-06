import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserActionType, UserContext } from "../../contexts/user.context";
import { LoginDTO } from "../../models/UserDTO";
import ApiService from "../../service/api.service";
import { ROUTE_GROUPS, ROUTE_REGISTER } from "../../service/constants";
import UserService from "../../service/user.service";

export default function LoginRoute() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    let path = useSearchParams()[0].get('path');

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        let loginDTO: LoginDTO = {
            email: data.email,
            password: data.password,
        };
        // TODORC: add checks
        UserService.login(loginDTO).then(function (response: string) {
            let user = ApiService.currentUser();
            if (user) {
                userContext.dispatch({ type: UserActionType.LOGIN, payload: user })
                if (path) {
                    navigate(path);
                } else {
                    navigate(ROUTE_GROUPS);
                }
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    console.log(errors);


    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Log in</h1>
            {useSearchParams()[0].get('authorizationFailed') ? <div>Your session was finished</div> : ""}
            <input {...register("email", { required: true })} placeholder="email" />
            <input {...register("password", { required: true })} placeholder="password" type='password' />
            <input type="submit" />
        </form>
        <Link to={ROUTE_REGISTER}>Don't have an account yet? Register here</Link>
    </div>
}