import { USERS } from "../../service/constants";
import ApiService from "../../service/api.service";

export default function Home() {
    ApiService.getCall(USERS).then(function (response) {
        console.log(response.data);
    })
    // TODO: write home page with a description of how
    return (
        <div>Home</div>
    )
}