import { useState } from "react";
import { useForm } from "react-hook-form";
import { DrinkDTO } from "../../../../models/DrinkDTO";

interface CommitDrink {
    drink: DrinkDTO,
    commitDrink: (drink: DrinkDTO) => void,
    setEditMode?: (editMode: boolean) => void
}

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

export function EditDrink(props: CommitDrink) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: props.drink.name,
            price: props.drink.price
        }
    });

    const commitDrink = (data: any) => {
        props.commitDrink({
            id: props.drink.id,
            name: data.name,
            price: data.price
        });
        if (props.setEditMode) {
            props.setEditMode(false);
        } else {
            props.drink.name = '';
            props.drink.price = 0;
        }
    }

    const cancel = () => {
        if (props.setEditMode) {
            props.setEditMode(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(commitDrink)}>
            <input {...register("name", { required: true })} placeholder="name" />
            <input {...register("price", { required: true, valueAsNumber: true })} type="number" placeholder="price" step="0.01" />
            {props.drink.id ? <input type="button" onClick={cancel} value="Cancel" /> : ""}
            <input type="submit" />
        </form>
    )

}

function DisplayDrink(props: CommitDrink) {
    const deleteDrink = () => {
        let drinkToDelete: DrinkDTO = props.drink;
        drinkToDelete.toDelete = true;
        props.commitDrink(drinkToDelete);
    }

    const editDrink = () => {
        if (props.setEditMode) {
            props.setEditMode(true);
        }
    }
    return <div>{props.drink.name} | {'\u20AC' + props.drink.price.toLocaleString('nl-NL', { minimumFractionDigits: 2 })} | <button onClick={editDrink}>Edit</button><button onClick={deleteDrink}>Delete</button></div>
}