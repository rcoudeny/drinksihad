import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CreateGroup } from "../../models/GroupDTO";
import { ROUTE_GROUPS } from "../../service/constants";
import GroupService from "../../service/group.service";

export default function CreateGroupRoute() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        let createGroup: CreateGroup = {
            name: data.name
        }
        GroupService.createGroup(createGroup).then(function (response) {
            navigate(ROUTE_GROUPS + "/" + response.id);
        }).catch(function (err) {
            console.log(err);
        });
    };

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create group</h1>
            <input {...register("name", { required: true })} placeholder="name" />
            <input type="submit" />
        </form>
        <Link to={ROUTE_GROUPS}>Cancel</Link>
    </div>
}