import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GroupDTO } from "../../../models/GroupDTO";
import { UserWithAdminDTO } from "../../../models/UserDTO";
import GroupService from "../../../service/group.service";
import GroupUsers from "./Users/GroupUsers";

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
    }, [id]);
    return <div>
        {!group ? <div>Loading</div> :
            <div>
                <div>{id} | {group.name}</div>
                <GroupUsers users={users}></GroupUsers>
            </div>
        }
    </div>;
}

