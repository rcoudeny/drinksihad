import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GroupDTO } from "../../../models/GroupDTO";
import { UserWithAdminDTO } from "../../../models/UserDTO";
import GroupService from "../../../service/group.service";
import Drinks from "./Drinks/Drinks";
import GroupUsers from "./Users/GroupUsers";

export default function GroupDetail() {
    let { id } = useParams();

    const [group, setGroup] = useState<GroupDTO | null>(null);
    const [users, setUsers] = useState<UserWithAdminDTO[] | null>(null);

    React.useEffect(function () {
        if (id) {
            loadGroup()
            GroupService.getUsersFromGroup(id).then(function (response) {
                setUsers(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [id]);

    function loadGroup() {
        setGroup(null);
        if (id) {

            GroupService.getGroup(id).then(function (response) {
                setGroup(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    return <div>
        {!group ? <div>Loading</div> :
            <div>
                <h1>{group.name}</h1>
                <Drinks groupId={group.id}></Drinks>
                <GroupUsers users={users} refreshGroup={loadGroup}></GroupUsers>
            </div>
        }
    </div>;
}

