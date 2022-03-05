import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GroupDTO } from "../../models/GroupDTO";
import GroupService from "../../service/group.service";

export default function GroupDetail() {
    let { id } = useParams();

    const [group, setGroup] = useState<GroupDTO | null>(null);

    React.useEffect(function () {
        if (id) {
            GroupService.getGroup(id).then(function (response) {
                setGroup(response);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, []);
    return <div>
        {!group ? <div>Loading</div> : <div>{id} | {group.name}</div>}
    </div>;

}