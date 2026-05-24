import connectDb from "@/lib/db";
import setting from "@/model/setting.model";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {

    try{
        const {ownerId} = await req.json();
if (!ownerId) {
    return new Response("ownerId is required", { status: 400 });
}

    await connectDb()
    const Setting = await setting.findOne(
        { ownerId }
    )
    return new Response(JSON.stringify(Setting), { status: 200 });
    }
    
    catch (error) {
        console.error("Error in POST /api/settings:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}
