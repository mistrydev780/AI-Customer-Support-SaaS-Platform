import { NextRequest } from "next/server";

import setting from "@/model/setting.model";
import connectDb from "@/lib/db";

export async function POST(req:NextRequest) {

    try{
        const { ownerId, businessName, supportEmail, knowledge } = await req.json();
if (!ownerId) {
    return new Response("ownerId is required", { status: 400 });
}

    await connectDb()
    const Setting = await setting.findOneAndUpdate(
        { ownerId },
        { businessName, supportEmail, knowledge },
        { new: true, upsert: true }
    )
    return new Response(JSON.stringify(Setting), { status: 200 });
    }
    catch (error) { 
        console.error("Error in POST /api/settings:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
    
}
