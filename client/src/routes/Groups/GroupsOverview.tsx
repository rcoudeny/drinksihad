import groups from "../../mockdata/groups";
import { GroupDTO } from "../../models/GroupDTO";

export default function Groups() {

    function createGroup() {
        console.log("Go to create group page");
    }
    function searchGroup() {
        console.log("Go to search group page");
    }
    // TODO: write group page

    return (
        <div className="groupsOverviewContainer">
            <div className="groupsContainer">
                <h1>Groups</h1>
                <div>
                    {groups.map(function (group) {
                        return <GroupTemplate key={group.id} {...group}></GroupTemplate>
                    })}
                </div>
            </div>
            <div className="groupEdits">
                <button onClick={createGroup}>Create group</button> <button onClick={searchGroup}>Search group</button>
            </div>
        </div>
    )
}

function GroupTemplate(props: GroupDTO) {
    return (
        <div>
            <h2>{props.name}</h2>
        </div>
    );
}