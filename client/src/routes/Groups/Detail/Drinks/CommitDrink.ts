import { DrinkDTO } from "../../../../models/DrinkDTO";

export interface CommitDrink {
    drink: DrinkDTO,
    commitDrink: (drink: DrinkDTO) => void,
    setEditMode?: (editMode: boolean) => void
}