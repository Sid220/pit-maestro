import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {config} from "@/lib/conf";
import {PitList} from "@prisma/client";

export async function POST(
    request: Request
) {
    const data = await request.json();

    let matchInfo = (data.matchInfo as string)
    let checks = (data.checks as string)

    let update = await prisma.pitList.updateMany({
        where: {
            match: matchInfo,
            event: config.event
        },
        data: {
            checks: JSON.stringify(checks)
        }
    })

    let signed: PitList | null | string = await prisma.pitList.findFirst({
        where: {
            match: matchInfo,
            event: config.event
        }
    })

    if (signed != null) {
        signed = signed.signed;
    }

    return NextResponse.json({
        "matchInfo": matchInfo,
        "updated": update.count.toString(),
        "signed": signed
    });
}