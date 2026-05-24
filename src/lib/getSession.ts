import { cookies } from "next/headers";
import { scalekit } from "@/lib/scalekit";

export async function getSession() {
    const session = await cookies()
    const token = session.get("access_token")?.value;
    console.log("SESSION TOKEN:", token);
    if(!token) {
        return null;
    }
    try {
    const result:any= await scalekit.validateToken(token);
    // console.log("VALIDATE TOKEN RESULT:", result);
    const user = await scalekit.user.getUser(result.sub);
    return user;
    }
    catch(error) {
        console.error("TOKEN VALIDATION ERROR:", error);
        return null;

    }

}