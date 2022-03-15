import { useState } from "react";
import { CommitDrink } from "./CommitDrink";
import { DisplayDrink } from "./DisplayDrink";
import { EditDrink } from "./EditDrink";

export default function Drink(props: CommitDrink) {

    const [editMode, setEditMode] = useState(false);

    const newProps: CommitDrink = {
        drink: props.drink,
        commitDrink: props.commitDrink,
        setEditMode: setEditMode
    }

    return (
        <div> {editMode ? <EditDrink {...newProps} ></EditDrink> : <DisplayDrink {...newProps}></DisplayDrink>}</div>
    )
}