import prisma from "@/lib/prisma";
import {config} from "@/lib/conf";
import Link from "next/link";
async function getList() {
    const feed = await prisma.pitList.findMany({
        where: {event: config.event}
    });
    return feed;
}

export default async function Page() {
    const data = await getList();
    return (
        <div>
            <h1>Past lists @ {config.event}</h1>
            {data.length == 0 && <p>No lists!</p>}
            {
                data.map((list) => {
                    return (<h2 key={list.id} ><Link href={"/list/" + list.match}>{list.match}</Link></h2>)
                })
            }
        </div>
    )
}