import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {loadConfigServer} from "@/lib/confServer";

export async function POST(
    request: Request
) {
    const data = await request.json();

    let matchInfo = (data.matchInfo as string)
    let signed = (data.signed as string)
    let event = (await loadConfigServer()).event;
    if (data.event !== undefined) {
        event = (data.event as string);
    }

    let update = await prisma.pitList.updateMany({
        where: {
            match: matchInfo,
            event: event
        },
        data: {
            signed: signed,
            submitted_at: new Date()
        }
    })

    return NextResponse.json({
        "matchInfo": matchInfo,
        "updated": update.count.toString()
    });
}