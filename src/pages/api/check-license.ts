import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";
import fetch from 'node-fetch';

type License = { capabilities: string[] }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "GET") return res.status(405).end();

    if (!process.env.SALABLE_PRODUCT_UUID) return res.status(500).json({
        error: 'Internal Server Error: Missing salable product UUID'
    });
    if (!process.env.SALABLE_READ_LICENSE) return res.status(500).json({
        error: 'Internal Server Error: Missing read license api key'
    });

    const {userId} = getAuth(req);

    if (!userId) return res.status(401).json({error: 'Unauthenticated'});

    try {
        const response = await fetch(
            `https://api.salable.app/licenses/check?productUuid=${process.env.SALABLE_PRODUCT_UUID}&granteeIds=${userId}`, {
                headers: {
                    'x-api-key': process.env.SALABLE_READ_LICENSE,
                    'version': 'v2'
                }
            });
        const license = await response.json() as License;
        console.log('license', license);

        return res.status(200).json({capabilities: license.capabilities});
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: 'Failed to check license'});
    }
}
