import React from "react";
import { useState } from "react";
import { DrinkDTO } from "../../../../models/DrinkDTO";
import GroupService from "../../../../service/group.service";
import Drink, { EditDrink } from "./DrinkComponent";

export default function Drinks(props: { groupId: string }) {
    const [drinks, setDrinks] = useState<DrinkDTO[] | null>(null);

    const createDrink = function (drink: DrinkDTO) {
        GroupService.createDrinkInGroupWithId(props.groupId, drink).then(function (drink) {
            if (drinks) {
                setDrinks([...drinks, drink]);
            }
        });
    }
    const deleteDrink = function (drinkId: string) {
        if (drinks) {
            GroupService.deleteDrinkInGroupWithId(props.groupId, drinkId).then(function () {
                setDrinks(drinks.filter(drink => drink.id !== drinkId));
            });
        }
    }
    const updateDrink = function (drink: DrinkDTO) {
        if (drinks) {
            GroupService.updateDrinkInGroupWithId(props.groupId, drink).then(function () {
                setDrinks(drinks.map(mDrink => mDrink.id === drink.id ? drink : mDrink));
            });
        }
    }

    const commitDrink = function (drink: DrinkDTO) {
        if (!drink.id) {
            createDrink(drink);
        } else if (drink.toDelete) {
            deleteDrink(drink.id);
        } else {
            updateDrink(drink);
        }
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
                return <Drink drink={drink} key={drink.id} commitDrink={commitDrink} />
            })}</div>}
            <EditDrink drink={{ id: '', name: '', price: 0 }} commitDrink={commitDrink}></EditDrink>

        </div >
    )
}

