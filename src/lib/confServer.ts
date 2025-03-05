import prisma from "@/lib/prisma";

export const apiKey = "uSqAJfiJwCciUTUQGRKjcSqdnq2p33fUWBseQePtdjS7bNvtbaPZ0nh7yUPdVbi0";

export async function loadConfigServer() {
    return (await prisma.config.findFirst({
        where: {
            id: 1
        }
    }))!;
}

