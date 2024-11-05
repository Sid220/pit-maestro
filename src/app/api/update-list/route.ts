import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {loadConfigServer} from "@/lib/conf";
import {PitList} from "@prisma/client";

export async function POST(
    request: Request
) {
    const data = await request.json();

    let matchInfo = (data.matchInfo as string)
    let checks = (data.checks as string)
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
            checks: JSON.stringify(checks),
            modified_at: new Date()
        }
    })

    let signed: PitList | null | string = await prisma.pitList.findFirst({
        where: {
            match: matchInfo,
            event: event
        }
    })

    if (signed != null) {
        signed = signed.signed;
    }

    return NextResponse.json({
        "matchInfo": matchInfo,
        "updated": update.count.toString(),
        "signed": signed,
        "event": event,
    });
}