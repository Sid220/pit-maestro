import {config} from "@/lib/conf";

export function updateMatches(setMatches: any) {
    fetch("https://www.thebluealliance.com/api/v3/team/frc" + config.team + "/event/" + config.event + "/matches", {
        headers: {
            "X-TBA-Auth-Key": config.apiKey
        }
    }).then(r => {
        r.json().then((j: any) => {
            setMatches(j.filter((val: any) => {
                return val["actual_time"] === null;
            }).sort((m1: any, m2: any) => {
                if (m1["comp_level"] === m2["comp_level"]) {
                    return m1['match_number'] - m2['match_number']
                } else if (m1["comp_level"] === "qm" && m2["comp_level"] !== "qm") {
                    return -1
                } else if (m1["comp_level"] !== "qm" && m2["comp_level"] === "qm") {
                    return 1
                } else if (m1["comp_level"] === "sf" && m2["comp_level"] !== "sf") {
                    return -1
                } else if (m1["comp_level"] !== "sf" && m2["comp_level"] === "sf") {
                    return 1
                } else {
                    return 0
                }
            }));
        })
    })
}