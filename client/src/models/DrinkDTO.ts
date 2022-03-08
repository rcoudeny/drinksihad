export interface DrinkDTO {
    id: string;
    name: string;
    price: number;
    toDelete?: boolean;
}

export interface DrinkCountDTO {
    drinkId: string;
    userId: string;
    count: number;
}