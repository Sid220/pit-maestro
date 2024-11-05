import {loadConfigServer} from "@/lib/conf";


export default async function Page() {
    return (
        <form action={"/api/get-conf"} method={"POST"}>
            <label>Team #:
                <input name={"team"} type={"number"}/>
            </label><br/><br/>
            <label>Event:
                <input name={"event"} type={"text"} />
            </label><br/><br/>
            <button type={"submit"}>Update</button>
        </form>
    )
}