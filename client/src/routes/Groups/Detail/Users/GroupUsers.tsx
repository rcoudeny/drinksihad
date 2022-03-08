import { useSearchParams } from "react-router-dom";
import { UserWithAdminDTO } from "../../../../models/UserDTO"
import ApiService from "../../../../service/api.service";

export default function GroupUsers(props: { users: UserWithAdminDTO[] | null, refreshGroup: () => void }) {
    const [searchParams, setSearchParams] = useSearchParams();

    let userMail: string = searchParams.get('email') || ApiService.currentUser()?.email || '';

    const setUrlParam = function (userMail: string) {
        console.log(userMail);

        setSearchParams({ email: userMail });
        props.refreshGroup();
    }

    return (
        <div>
            {!props.users ? <div>Loading</div> : <div>{props.users.map(function (user) {
                return (<div style={{ color: userMail === user.email ? 'blue' : 'black' }} onClick={() => setUrlParam(user.email)} key={user.email}>{user.email} | {user.username}{user.isAdmin ? <span> | Admin</span> : ''}</div>)
            })}</div>}
        </div>
    )
}