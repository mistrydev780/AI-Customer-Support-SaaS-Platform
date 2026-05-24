import setting from "@/model/setting.model";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/lib/db";


export async function POST(req: NextRequest) {
    try {
        const { message, ownerId } = await req.json();
        if (!message || !ownerId) {
            return new Response("message and ownerId are required", { status: 400 });
        }
        await connectDb();
        const Setting = await setting.findOne({ ownerId });
        if (!Setting) {
            return new Response("Settings not found for the given ownerId", { status: 404 });
        }
   
        const KNOWLEDGE = `
        Business Name: ${Setting.businessName || "not provided"}
        Support Email: ${Setting.supportEmail || "  not provided"}
        Knowledge: ${Setting.knowledge || " not provided"}
        `

    const prompt = `
You are a professional AI customer support assistant for this business.

Your role:
- Help customers politely and professionally.
- Answer ONLY using the business information provided below.
- Keep responses short, clear, and human-like.
- Use simple English.
- Be helpful and friendly.

IMPORTANT RULES:
- Do NOT invent policies, prices, delivery times, or features.
- Do NOT make fake promises.
- Do NOT answer unrelated questions.
- If information is missing, say:
"Please contact support for more details."
- If the customer asks something unrelated to the business, reply:
"Please contact support."

You may:
- Summarize information
- Rephrase business policies
- Explain products or support details
- Answer FAQs based on provided data

-----------------------------------
BUSINESS INFORMATION
-----------------------------------

${KNOWLEDGE}

-----------------------------------
CUSTOMER QUESTION
-----------------------------------

${message}

-----------------------------------
AI RESPONSE RULES
-----------------------------------

Response should:
- Sound natural
- Be concise
- Be professional
- Avoid markdown
- Avoid bullet points unless necessary
- Avoid long paragraphs
- Never mention you are an AI language model

Now generate the best customer support response.
`

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY!});


  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(res.text);

const response = NextResponse.json(res.text, { status: 200 });
response.headers.set("Access-Control-Allow-Origin", "*");
response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
response.headers.set("Access-Control-Allow-Headers", "Content-Type");
return response;

}
    catch (error) {
     const response = NextResponse.json({ error: "An error occurred while processing the request." }, { status: 500 });
     response.headers.set("Access-Control-Allow-Origin", "*");
     response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
     response.headers.set("Access-Control-Allow-Headers", "Content-Type");
     return response;
        
    }
}


export const OPTIONS =async () => {
    return NextResponse.json(null, { status: 201, headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    } });
}
