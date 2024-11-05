import prisma from "@/lib/prisma";

export const apiKey = "uSqAJfiJwCciUTUQGRKjcSqdnq2p33fUWBseQePtdjS7bNvtbaPZ0nh7yUPdVbi0";

const config = {
    event: null,
    team: null,
    apiKey: apiKey
}

export function loadConfig() {
    if (config.event == null) {
        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/get-conf", false);
        xhttp.send();

        let j = JSON.parse(xhttp.responseText);

        config.event = j.event;
        config.team = j.team;

        return config;
    } else {
        return config;
    }
}

export async function loadConfigServer() {
    return (await prisma.config.findFirst({
        where: {
            id: 1
        }
    }))!;
}

