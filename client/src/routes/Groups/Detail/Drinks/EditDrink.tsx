import { useForm } from "react-hook-form";
import { CommitDrink } from "./CommitDrink";

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