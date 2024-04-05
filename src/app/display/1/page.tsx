'use client';

import {config} from "@/lib/conf";
import {useEffect, useState} from "react";
import {updateMatches} from "@/lib/updateMatches";

function getTimeString(date: Date) {
    let timeTill = date.getTime() - Date.now();
    let timeTillStr = " (" + (Math.floor(timeTill / 1000 / 60 / 60) > 0 ? Math.floor(timeTill / 1000 / 60 / 60) + "h " : "") + (Math.floor(timeTill / 1000 / 60 % 60) > 0 ? Math.floor(timeTill / 1000 / 60 % 60) + "m" : "") + ")";
    if (Math.sign(timeTill) === -1) {
        timeTillStr = " (DELAYED)";
    }
    // 15 Min
    let isClose = timeTill < 1000 * 60 * 15;
    return [
        (date.getHours() <= 12 ? date.getHours() : date.getHours() - 12) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + timeTillStr,
        isClose
    ];
}

function updateRankings(setRankings: any) {
    fetch("https://www.thebluealliance.com/api/v3/event/" + config.event + "/rankings", {
        headers: {
            "X-TBA-Auth-Key": config.apiKey
        }
    }).then(r => {
        r.json().then((j: any) => {
            setRankings(j["rankings"].sort((m1: any, m2: any) => m1['rank'] - m2['rank']));
        })
    })
}

export default function One() {
    let rankings, setRankings, ratings, setRatings, matches, setMatches, matchesPlayed, setMatchesPlayed;
    let streamChannel = 'nefirst_blue';
    [rankings, setRankings] = useState([]);
    [matches, setMatches] = useState([]);
    [ratings, setRatings] = useState([0, 0, 0]);
    [matchesPlayed, setMatchesPlayed] = useState(0);

    useEffect(() => {
        const getData = () => {
            updateRankings(setRankings);
            updateMatches(setMatches);
        }
        getData();
        setInterval(getData, 1000 * 60);
    }, []);

    useEffect(() => {
        let record = rankings.find((a: any) => {
            return a["team_key"] === ("frc" + config.team)
        });
        if (typeof record !== "undefined") {
            setRatings([record["record"]["wins"], record["record"]["losses"], record["record"]["ties"]])
            setMatchesPlayed(record["matches_played"])
        }
    }, [rankings, setRatings, setMatchesPlayed]);

    return (<div>
            <div>Pit Maestro Pit Hawk by Team 2713 - Team {config.team} @ {config.event}</div>
            <div className="grid grid-cols-3">
                <div>
                    {(matches.length > 0) && (<div
                        className={"bg-gray-800 rounded-md p-4 m-2 flex gap-2 " + (getTimeString(new Date(matches[0]["time"] * 1000))[1] ? "bg-red-800 animate-pulse" : "")}>
                        <span>{(matches[0] as any)["key"].replace(config.event + "_", "")}</span>
                        <div className="bg-red-500 w-1/3 flex justify-center gap-6 rounded-md">
                            {(matches[0] as any)["alliances"]["red"]["team_keys"].map((team: any, index: number) =>
                                <span
                                    className={(team === "frc" + config.team ? "underline font-extrabold" : "")}
                                    key={index}>{team.replace("frc", "")}</span>)}
                        </div>
                        <div className="bg-blue-500 w-1/3 flex justify-center gap-6 rounded-md">
                            {(matches[0] as any)["alliances"]["blue"]["team_keys"].map((team: any, index: number) =>
                                <span
                                    className={(team === "frc" + config.team ? "underline font-extrabold" : "")}
                                    key={index}>{team.replace("frc", "")}</span>)}
                        </div>
                        {getTimeString(new Date(matches[0]["time"] * 1000))[0]}
                    </div>)}
                    <p className="ml-3 mt-3">{ratings[0]}-{ratings[1]}-{ratings[2]}, {matchesPlayed} Matches Played</p>
                    {rankings.map((a: any, index) => {
                        return (<div key={index}>{(() => {
                            if (index < 5) {
                                return (<div
                                    className={((a["team_key"] === "frc" + config.team) ? "bg-green-600" : "bg-gray-800") + " rounded-md p-2 m-2"}>{index + 1}
                                    . {a["team_key"].replace("frc", "")}</div>)
                            } else if (a["team_key"] === ("frc" + config.team)) {
                                return (<>
                                        <div>...</div>
                                        <div className="bg-gray-800 rounded-md p-2 m-2">{index}
                                            . {(rankings[index - 1]["team_key"] as string).replace("frc", "")}</div>
                                        <div
                                            className="bg-green-600 rounded-md p-2 m-2">{index + 1}. {a["team_key"].replace("frc", "")}</div>
                                        <div className="bg-gray-800 rounded-md p-2 m-2">{index + 2}
                                            . {(rankings[index + 1]["team_key"] as string).replace("frc", "")}</div>
                                    </>
                                )
                            }
                        })()}</div>)
                    })}
                </div>
                <div className="col-span-2">
                    <iframe className="w-[60vw] h-96"
                            frameBorder="0" allowFullScreen={true} scrolling="no"
                            src={"https://player.twitch.tv/?channel=" + streamChannel + "&parent=pit-maestro.vercel.app"}></iframe>
                </div>
            </div>
            {matches.map((a: any, index) => {
                return <div key={index}
                            className={"bg-gray-800 rounded-md p-4 m-2 flex gap-2 " + (getTimeString(new Date(a["time"] * 1000))[1] ? "bg-red-800 animate-pulse" : "")}>
                    <span>{a["key"].replace(config.event + "_", "")}</span>
                    <div className="bg-red-500 w-1/3 flex justify-center gap-6 rounded-md">
                        {a["alliances"]["red"]["team_keys"].map((team: any, index: number) => <span
                            className={(team === "frc" + config.team ? "underline font-extrabold" : "")}
                            key={index}>{team.replace("frc", "")}</span>)}
                    </div>
                    <div className="bg-blue-500 w-1/3 flex justify-center gap-6 rounded-md">
                        {a["alliances"]["blue"]["team_keys"].map((team: any, index: number) => <span
                            className={(team === "frc" + config.team ? "underline font-extrabold" : "")}
                            key={index}>{team.replace("frc", "")}</span>)}
                    </div>
                    {getTimeString(new Date(a["time"] * 1000))[0]}
                </div>
            })}
        </div>
    );
}