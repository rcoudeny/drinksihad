import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GroupDTO } from "../../models/GroupDTO";
import { UserWithAdminDTO } from "../../models/UserDTO";
import GroupService from "../../service/group.service";

export default function GroupDetail() {
    let { id } = useParams();

    const [group, setGroup] = useState<GroupDTO | null>(null);
    const [users, setUsers] = useState<UserWithAdminDTO[] | null>(null);

    React.useEffect(function () {
        if (id) {
            GroupService.getGroup(id).then(function (response) {
                setGroup(response);
            }).catch(function (error) {
                console.log(error);
            });
            GroupService.getUsersFromGroup(id).then(function (response) {
                setUsers(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, []);
    return <div>
        {!group ? <div>Loading</div> :
            <div>
                <div>{id} | {group.name}</div>
                <Users users={users}></Users>
            </div>

        }
    </div>;

}

function Users(props: { users: UserWithAdminDTO[] | null }) {
    return (
        <div>
            {!props.users ? <div>Loading</div> : <div>{props.users.map(function (user) {
                return (<div>{user.email} | {user.username}{user.isAdmin ? <span> | Admin</span> : ''}</div>)
            })}</div>}
        </div>
    )
}