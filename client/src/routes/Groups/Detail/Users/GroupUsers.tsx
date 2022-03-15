import { useSearchParams } from "react-router-dom";
import Loader from "../../../../components/Utils/Loader/Loader";
import { UserWithAdminDTO } from "../../../../models/UserDTO"
import ApiService from "../../../../service/api.service";

export default function GroupUsers(props: { users: UserWithAdminDTO[] | null }) {
    const [searchParams, setSearchParams] = useSearchParams();

    let userMail: string = searchParams.get('email') || ApiService.currentUser()?.email || '';

    const setUrlParam = function (userMail: string) {
        setSearchParams({ email: userMail });
    }

    return (
        <div>
            {!props.users ? <Loader /> : <div>{props.users.map(function (user) {
                return (<div style={{ color: userMail === user.email ? 'blue' : 'black' }} onClick={() => setUrlParam(user.email)} key={user.email}>{user.email} | {user.username}{user.isAdmin ? <span> | Admin</span> : ''}</div>)
            })}</div>}
        </div>
    )
}