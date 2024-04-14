import {Check, CheckTypes, toJSONString} from "@/lib/checklist";
import {Dispatch, FormEvent, SetStateAction, useEffect} from "react";
import {config} from "@/lib/conf";


export function updateForm(matchInfo: string, event: string, checks: Check[], setSubmitted: Dispatch<SetStateAction<boolean>>) {
    let data = toJSONString(checks);
    const response = fetch('/api/update-list', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "matchInfo": matchInfo,
            "checks": checks,
            "event": event,
        })
    }).then((res) => {
        res.json().then((json) => {
            console.log(json);
            if (json.signed !== null && json.signed !== "") {
                setSubmitted(true)
            } else {
                setSubmitted(false);
            }
        })
    })
}

export function renderForm(checks: Check[], setCheckList: Dispatch<SetStateAction<Check[]>>, matchInfo: string, submitted: boolean, setSubmitted: Dispatch<SetStateAction<boolean>>, signed: string, setSigned: Dispatch<SetStateAction<string>>, event?: string) {
    let matchEvent = config.event;
    if (event !== undefined) {
        matchEvent = event;
    }
    if (matchInfo == "") {
        return <p>Match not found/please select match</p>
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let areUSure = confirm("Submit now?")

        if (!areUSure) {
            return;
        }

        const response = fetch('/api/submit-list', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "matchInfo": matchInfo,
                "signed": signed,
                "event": matchEvent
            })
        }).then((res) => {
            res.json().then((json) => {
                if (json.updated === "1") {
                    setSubmitted(true);
                }
            })
        })
    }

    return (
        <div>
            <p>Match: {matchInfo} @ {matchEvent}</p>
            <form onSubmit={onSubmit}>
                {checks.map((check, index) => {
                    return (<span key={index}>
                        {(() => {
                            if (check.mode == CheckTypes.HEADER_1) {
                                return <h1>{check.value}</h1>
                            } else if (check.mode == CheckTypes.HEADER_2) {
                                return <h2>{check.value}</h2>
                            } else if (check.mode == CheckTypes.BOOL) {
                                return <span><label><input
                                    type="checkbox"
                                    checked={(checks[index].state as boolean)}
                                    style={{
                                        transform: "scale(1.3)"
                                    }}
                                    onChange={(e) => {
                                        setCheckList(checks.map(((item, c_index) =>
                                            c_index === index
                                                ? new Check(CheckTypes.BOOL, check.value, (e.target as HTMLInputElement).checked)
                                                : item)))
                                    }}
                                    disabled={submitted}
                                /> <span>{check.value}</span></label>
                                    <hr style={{
                                        margin: "10px"
                                    }}/>
                                </span>
                            } else if (check.mode == CheckTypes.STRING) {
                                return <label>{check.value}: <textarea value={(checks[index].state as string)}
                                                                       onChange={(e) => {
                                                                           setCheckList(checks.map(((item, c_index) =>
                                                                               c_index === index
                                                                                   ? new Check(CheckTypes.STRING, check.value, (e.target as HTMLTextAreaElement).value)
                                                                                   : item)))
                                                                       }}
                                                                       style={{
                                                                           height: "75px",
                                                                           width: "75%"
                                                                       }}
                                                                       disabled={submitted}/></label>
                            }
                        })()}
                    </span>)
                })}
                <br/>
                Signed: <input required type="text" disabled={submitted} value={signed} onChange={(e) => {
                setSigned((e.target as HTMLInputElement).value);
            }}/>
                <button type="submit" disabled={submitted} className="primary">Submit</button>
            </form>
        </div>
    )
}