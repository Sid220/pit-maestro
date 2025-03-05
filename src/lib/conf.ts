'use client';

export const apiKey = "uSqAJfiJwCciUTUQGRKjcSqdnq2p33fUWBseQePtdjS7bNvtbaPZ0nh7yUPdVbi0";

const config: {
    event: string | null,
    team: string | null,
    apiKey: string
} = {
    event: null,
    team: null,
    apiKey: apiKey
};

export function loadConfig() {
    if (typeof window !== "undefined") {
        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/get-conf", false);
        xhttp.send();

        let j = JSON.parse(xhttp.responseText);

        config.event = j.event;
        config.team = j.team;
    }
    return config;

}

