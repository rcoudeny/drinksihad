import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { DrinkDTO } from "../../../../models/DrinkDTO";
import ApiService from "../../../../service/api.service";
import DrinkService from "../../../../service/drink.service";

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

    const toCurrency = function (price: number): string {
        return '\u20AC' + price.toLocaleString('nl-NL', { minimumFractionDigits: 2 })
    }

    const editDrink = () => {
        if (props.setEditMode) {
            props.setEditMode(true);
        }
    }
    return <div>
        {props.drink.name} | {toCurrency(props.drink.price)} |
        <button onClick={editDrink}>Edit</button><button onClick={deleteDrink}>Delete</button> |
        <DrinkCount drinkId={props.drink.id}></DrinkCount>
    </div>
}

function DrinkCount(props: { drinkId: string }) {
    const [count, setCount] = useState<number>(0);
    const [searchParams, setSearchParams] = useSearchParams();
    let userMail: string = searchParams.get('email') || ApiService.currentUser()?.email || '';

    React.useEffect(function () {
        DrinkService.getDrinkCount(props.drinkId, userMail)
            .then((drinkCount) => {
                setCount(drinkCount.count);
            });
    }, [props.drinkId, userMail])

    const increment = function () {
        setCount(count + 1);
        DrinkService.incrementDrinkCount(props.drinkId, userMail).catch(function (err) {
            console.log("distort happy flow");
        });
    }

    const decrement = function () {
        if (count > 0) {
            setCount(count - 1);
            DrinkService.decrementDrinkCount(props.drinkId, userMail).catch(function (err) {
                console.log("distort happy flow");
            });
        }

    }

    return (
        <React.Fragment>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </React.Fragment>
    )
}