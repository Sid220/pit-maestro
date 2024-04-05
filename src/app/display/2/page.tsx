'use client';

import {
    AwaitedReactNode,
    FormEvent,
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react";
import {config} from "@/lib/conf";
import {Check, CheckTypes, fromJSONString} from "@/lib/checklist";
import {updateMatches} from "@/lib/updateMatches";

async function updatePitCheckList(formData: FormData, setChecks: any, setSigned: any) {
    const response = await fetch('/api/get-list', {
        method: 'POST',
        body: formData,
    })

    const data = await response.json()

    setChecks(fromJSONString(data.checks))
    setSigned(data.signed)

    return data.matchInfo;
}

export default function One() {
    let checklist, setCheckList: (arg0: Check[]) => void, signed, setSigned: (arg0: any) => void;
    [checklist, setCheckList] = useState<Check[]>([]);
    [signed, setSigned] = useState<string>("");
    const [matches, setMatches] = useState([]);
    const [matchInfo, setMatchInfo] = useState("");
    const initialized = useRef(false)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()


        const formData = new FormData(event.currentTarget)

        setMatchInfo(await updatePitCheckList(formData, setCheckList, setSigned));
    }

    useEffect(() => {
        const pitStartInternal = setInterval(() => {
            if (matchInfo !== "") {
                let form_data = new FormData();
                form_data.append("match_info", matchInfo);

                updatePitCheckList(form_data, setCheckList, setSigned).then(() => {
                    console.log("Updated pit checklist")
                });
            }
        }, 1000);
        return () => {
            clearInterval(pitStartInternal);
        };
    }, [matchInfo]);

    useEffect(() => {
        console.log("Updated matches")
        updateMatches(setMatches);
    }, []);

    return (
        <div className="m-6">
            <div>Pit Maestro Pit Hawk by Team 2713 - Team {config.team} @ {config.event}</div>

            {matches.length < 1 && <form onSubmit={onSubmit}>
                <select name="m_type" required={true} className="text-black">
                    <option value="qm">Qual</option>
                    <option value="sf">Semi</option>
                    <option value="f1m">Final</option>
                    <option value="pr">Practice</option>
                </select> <input type="number" className="text-black" name="m_num" required={true}/>
                <button type="submit">Set</button>
            </form>}
            {matches.length > 0 && <form onSubmit={onSubmit}>
                <select name="m_type" defaultValue={matches[0]["comp_level"]} required={true} className="text-black">
                    <option value="qm">Qual</option>
                    <option value="sf">Semi</option>
                    <option value="f1m">Final</option>
                    <option value="pr">Practice</option>
                </select> <input type="number" className="text-black" name="m_num"
                                 defaultValue={matches[0]["match_number"]} required={true}/>
                <button type="submit">Set</button>
            </form>}
            <h1>Pit List: <span
                className={signed !== "" ? "text-green-500" : "text-red-800"}>{signed !== "" ? "Complete" : "Incomplete"}</span>
            </h1>
            <p>Signed: {signed} - {matchInfo}</p>
            <div className="grid grid-cols-3">
                <div className="col-span-3 columns-4 gap-4">
                    {checklist.map((j, index) => {
                        return (() => {
                            if (j.mode === CheckTypes.HEADER_1) {
                                return <h1 key={index}>{j["value"]}</h1>
                            } else if (j.mode === CheckTypes.HEADER_2) {
                                return <h2 key={index}>{j["value"]}</h2>
                            } else if (j.mode === CheckTypes.STRING) {
                                return <div key={index} className={"p-2 bg-gray-800 rounded-md mb-4"}><span
                                    className="font-bold">{j.value}:</span> {j.state}</div>
                            } else if (j.mode === CheckTypes.BOOL) {
                                return <div key={index}
                                            className={"p-2 bg-gray-800 rounded-md mb-4 " + (((j.state as boolean) || signed !== "") ? "" : "bg-red-800")}>
                                    <input
                                        type="checkbox"
                                        defaultChecked={(j.state as boolean)}
                                        className="peer sr-only"
                                    />
                                    <span
                                        className="inset-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 transition"
                                    >
                            {(!(j.state as boolean) && <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>)}

                                        {((j.state as boolean) && <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-green-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>)}
                              </span>
                                    <span className="text-lg">{j.value}</span>
                                </div>
                            }
                        })()
                    })}
                </div>
            </div>
        </div>
    );
}