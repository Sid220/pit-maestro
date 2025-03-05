import {loadConfigServer} from "@/lib/confServer";


export default async function Page() {
    const config = (await loadConfigServer());
    return (
        <form action={"/api/get-conf"} method={"POST"}>
            <label>Team #:
                <input name={"team"} type={"number"} defaultValue={config.team}/>
            </label><br/><br/>
            <label>Event:
                <input name={"event"} type={"text"} defaultValue={config.event}/>
            </label><br/><br/>
            <button type={"submit"}>Update</button>
        </form>
    )
}