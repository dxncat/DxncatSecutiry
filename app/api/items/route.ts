import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const {
            typeElement,
            isFavorite,
            name,
            directory,
            username,
            password,
            urlWebsite,
            notes,
            userId
        } = await req.json()

        const element = await db.element.create({
            data: {
                typeElement,
                isFavorite,
                name,
                directory,
                username,
                password,
                urlWebsite,
                notes,
                userId
            }
        })

        return NextResponse.json(element)

    } catch (error) {
        console.error(error)
        return new NextResponse("Error Interno", { status: 500 })
    }
}