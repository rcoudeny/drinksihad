import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DrinkDTO } from "../../../../models/DrinkDTO";
import GroupService from "../../../../service/group.service";

export default function Drinks(props: { groupId: string }) {
    const [drinks, setDrinks] = useState<DrinkDTO[] | null>(null);

    const { register, handleSubmit } = useForm();

    const createDrink = (data: any) => {
        GroupService.addDrinkToGroupWithId(props.groupId, data).then(function (drink) {
            if (drinks) {
                setDrinks([...drinks, drink]);
            }
        });
    }

    React.useEffect(function () {
        GroupService.getDrinksFromGroupWithId(props.groupId).then(function (drinks) {
            setDrinks(drinks);
            console.log(drinks);
        }).catch(function (err) {
            console.log(err);
        })
    }, [])

    return (
        <div>
            {!drinks ? <div>Loading</div> : <div>{drinks.map(function (drink) {
                return <Drink drink={drink} key={drink.id} />
            })}</div>}
            <form onSubmit={handleSubmit(createDrink)}>
                <h1>Create Drink</h1>
                <input {...register("name", { required: true })} placeholder="name" />
                <input {...register("price", { required: true })} type="number" placeholder="price" />
                <input type="submit" />
            </form>
        </div>
    )
}

function Drink(props: { drink: DrinkDTO }) {
    return (
        <div>{props.drink.name} | {props.drink.price}</div>
    )
}