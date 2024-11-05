import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {

    const configFromDb = await prisma.config.findFirst({
        where: {
            id: 1
        }
    });

    if (configFromDb === null) {
        return NextResponse.error();
    }

    return NextResponse.json({
        event: configFromDb.event,
        team: configFromDb.team,
    });
}

export async function POST(request: Request) {
    const data = await request.formData();

    const config = prisma.config.update({
        where: {
            id: 1
        },
        data: {
            team: parseInt(data.get("team") as string),
            event: data.get("event") as string
        }
    });

    console.log(await config)

    return NextResponse.redirect(new URL("/conf", request.url))
}