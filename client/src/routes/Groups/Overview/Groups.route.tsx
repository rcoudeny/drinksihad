import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Utils/Loader/Loader";
import { GroupDTO } from "../../../models/GroupDTO";
import { ROUTE_CREATE_GROUP, ROUTE_GROUPS, ROUTE_SEARCH_GROUP } from "../../../service/constants";
import GroupService from "../../../service/group.service";

export default function GroupsRoute() {
    const [error, setError] = useState<string | null>(null);
    const [groups, setGroups] = useState<GroupDTO[] | null>(null);
    const navigate = useNavigate();

    React.useEffect(function () {
        loadGroups();
    }, []);

    function loadGroups() {
        setGroups(null);
        GroupService.getGroups().then(function (response) {
            setGroups(response);
        }).catch(function (error) {
            setError(error);
        })
    }

    function createGroup() {
        navigate(ROUTE_CREATE_GROUP);
    }
    function searchGroup() {
        navigate(ROUTE_SEARCH_GROUP);
    }
    // TODO: write group page

    return (
        <div className="groupsOverviewContainer">
            <h1>Groups <button onClick={loadGroups}>Reload groups</button></h1>
            {error === null ? <GroupsTemplate groups={groups}></GroupsTemplate> : <Error message={error}></Error>}
            <div className="groupEdits">
                <button onClick={createGroup}>Create group</button> <button onClick={searchGroup}>Search group</button>
            </div>
        </div>
    )
}

function Error(props: { message: string }) {
    return <div>Something went wrong: {props.message}</div>
}

function GroupsTemplate(props: { groups: GroupDTO[] | null }) {
    return <div className="groupsContainer">
        <div>
            {props.groups === null ? <Loader /> : props.groups.map(function (group) {
                return <GroupTemplate key={group.id} {...group}></GroupTemplate>
            })}
        </div>
    </div>
}

function GroupTemplate(group: GroupDTO) {
    const navigate = useNavigate();
    function groupDetail(id: string) {
        navigate(ROUTE_GROUPS + "/" + id);
    }
    return (
        <div onClick={() => groupDetail(group.id)}>
            <h2>{group.name}</h2>
        </div>
    );
}