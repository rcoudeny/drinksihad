import React from "react";
import { useState } from "react";
import Loader from "../../../../components/Utils/Loader/Loader";
import { DrinkDTO } from "../../../../models/DrinkDTO";
import DrinkService from "../../../../service/drink.service";
import Drink from "./Drink";
import { EditDrink } from "./EditDrink";

export default function Drinks(props: { groupId: string }) {
    const [drinks, setDrinks] = useState<DrinkDTO[] | null>(null);

    const createDrink = function (drink: DrinkDTO) {
        DrinkService.createDrinkInGroupWithId(props.groupId, drink).then(function (drink) {
            if (drinks) {
                setDrinks([...drinks, drink]);
            }
        });
    }
    const deleteDrink = function (drinkId: string) {
        if (drinks) {
            DrinkService.deleteDrink(drinkId).then(function () {
                setDrinks(drinks.filter(drink => drink.id !== drinkId));
            });
        }
    }
    const updateDrink = function (drink: DrinkDTO) {
        if (drinks) {
            DrinkService.updateDrink(drink).then(function () {
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
        DrinkService.getDrinksFromGroupWithId(props.groupId).then(function (drinks) {
            setDrinks(drinks);
        }).catch(function (err) {
            console.log(err);
        })
    }, [props.groupId])

    return (
        <div>
            {!drinks ? <Loader /> : <div>{drinks.map(function (drink) {
                return <Drink drink={drink} key={drink.id} commitDrink={commitDrink} />
            })}</div>}
            <EditDrink drink={{ id: '', name: '', price: 0 }} commitDrink={commitDrink}></EditDrink>

        </div >
    )
}

