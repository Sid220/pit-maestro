import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {config} from "@/lib/conf";

export async function POST(
    request: Request
) {
    const data = await request.json();

    let matchInfo = (data.matchInfo as string)
    let signed = (data.signed as string)

    let update = await prisma.pitList.updateMany({
        where: {
            match: matchInfo,
            event: config.event
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