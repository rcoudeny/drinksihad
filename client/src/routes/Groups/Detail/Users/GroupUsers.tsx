import { UserWithAdminDTO } from "../../../../models/UserDTO"

export default function GroupUsers(props: { users: UserWithAdminDTO[] | null }) {
    return (
        <div>
            {!props.users ? <div>Loading</div> : <div>{props.users.map(function (user) {
                return (<div key={user.email}>{user.email} | {user.username}{user.isAdmin ? <span> | Admin</span> : ''}</div>)
            })}</div>}
        </div>
    )
}