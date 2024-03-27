import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {config} from "@/lib/conf";
import {PitList} from "@prisma/client";
import {checklist, toJSONString} from "@/lib/checklist";

export async function GET(
    request: Request
) {
    return NextResponse.json({})
}

async function getOrCreate(matchInfo: string): Promise<PitList> {
    const data = await prisma.pitList.findFirst({
        where: {
            match: matchInfo,
            event: config.event
        }
    });

    if (data == null) {
        return prisma.pitList.create({
            data: {
                match: matchInfo,
                event: config.event,
                signed: "",
                checks: toJSONString(checklist)
            }
        });
    }

    return data;
}

export async function POST(
    request: Request
) {
    const data = await request.formData();
    let matchInfo = "";
    if (data.get("m_type") !== null && data.get("m_num") !== null) {
        matchInfo = (data.get("m_type") as string) + (data.get("m_num") as string);
    }
    else if (data.get("match_info") !== null) {
        matchInfo = (data.get("match_info") as string);
    }
    else {
        return NextResponse.error();
    }

    const row = await getOrCreate(matchInfo);
    return NextResponse.json({
        "id": row.id,
        "matchInfo": matchInfo,
        "checks": row.checks,
        "signed": row.signed
    });
}