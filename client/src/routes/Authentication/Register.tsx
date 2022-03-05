
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserContext } from "../../components/App/contexts";
import { RegisterDTO } from "../../models/UserDTO";
import ApiService from "../../service/api.service";
import { ROUTE_LOGIN } from "../../service/constants";
import UserService from "../../service/user.service";

// interface UserLoginDTO {
//     username: string,
//     email: string;
//     password: string;
//     confirmPassword: string;
// }

export default function Register() {
    const userContext = useContext(UserContext);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        let registerDTO: RegisterDTO = {
            username: data.username,
            email: data.email,
            password: data.password,
        };
        // TODORC: add checks
        UserService.createUser(registerDTO).then(function (response: string) {
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
            <h1>Register</h1>
            <input {...register("username", { required: true, minLength: 2 })} placeholder="username" />
            <input {...register("email", { required: true })} placeholder="email" />
            <input {...register("password", { required: true })} placeholder="password" type='password' />
            <input {...register("confirmPassword", { required: true })} placeholder="confirm password" type="password" />
            <input type="submit" />
        </form>
        <Link to={"/" + ROUTE_LOGIN}>Already have an account? Login here</Link>
    </div>
}

