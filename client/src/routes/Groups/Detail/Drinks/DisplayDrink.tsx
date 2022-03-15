import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../../components/Utils/Loader/Loader";
import { DrinkDTO } from "../../../../models/DrinkDTO";
import ApiService from "../../../../service/api.service";
import DrinkService from "../../../../service/drink.service";
import { CommitDrink } from "./CommitDrink";

export function DisplayDrink(props: CommitDrink) {
    const [count, setCount] = useState<number | null>(0);
    const [searchParams] = useSearchParams();
    let userMail: string = searchParams.get('email') || ApiService.currentUser()?.email || '';

    React.useEffect(function (): () => void {
        let isSubscribed = true;
        setCount(null);
        DrinkService.getDrinkCount(props.drink.id, userMail)
            .then((fetchedCount) => {
                if (isSubscribed) {
                    setCount(fetchedCount);
                }
            });
        return () => isSubscribed = false;
    }, [props.drink.id, userMail])

    const increment = function () {
        if (count !== null) {
            setCount(count + 1);
            DrinkService.incrementDrinkCount(props.drink.id, userMail).catch(function (err) {
                console.log("distort happy flow");
            });
        }
    }

    const decrement = function () {
        if (count !== null && count > 0) {
            setCount(count - 1);
            DrinkService.decrementDrinkCount(props.drink.id, userMail).catch(function (err) {
                console.log("distort happy flow");
            });
        }
    }

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
        <button onClick={decrement}>-</button>
        <span>{count === null ? <Loader /> : count}</span>
        <button onClick={increment}>+</button> |
        {count === null ? <Loader /> : toCurrency(count * props.drink.price)}
    </div>
}