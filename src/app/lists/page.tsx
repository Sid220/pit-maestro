import prisma from "@/lib/prisma";
import {apiKey} from "@/lib/conf";
import Link from "next/link";
import {unstable_noStore as noStore} from 'next/cache';

export const revalidate = 0;

// async function getEventDate(event: string) {
//     const data = await (await fetch(`https://www.thebluealliance.com/api/v3/event/${event}/simple`, {
//         headers: {
//             "X-TBA-Auth-Key": apiKey
//         }
//     })).json();
//
//     return Date.parse(data.start_date);
// }

async function getList() {
    let data = (await prisma.pitList.findMany());

    // let eventDates = new Map<string, number>()
    //
    // for (const list of data) {
    //     if (!eventDates.has(list.event)) {
    //         eventDates.set(list.event, await getEventDate(list.event));
    //     }
    // }

    data.sort((a, b) => {
        if (a.match == b.match) return 0;
        else if (a.modified_at == null) return 1;
        else if (b.modified_at == null) return -1;
        return a.modified_at < b.modified_at ? 1 : -1;
    });

    return data;
}

export default async function Page() {
    noStore();
    const data = await getList();
    return (
        <div>
            <h1>Past lists</h1>
            {data.length == 0 && <p>No lists!</p>}
            {
                data.map((list, id) => {
                    return (<h2 key={id}><Link
                        href={"/list/" + list.event + "_" + list.match}>{list.match} @ {list.event}</Link></h2>)
                })
            }
        </div>
    )
}