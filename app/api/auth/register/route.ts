import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("POST /api/auth/register");
    try {
        const { email, password, username } = await req.json();
        const hashedPassword = await hash(password, 10);

        if (!email || !password) {
            return new NextResponse("Correo y contraseña son obligatorios", { status: 400 });
        }

        const user = await db.user.create({
            data: {
                email,
                hashedPassword,
                username,
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        return new NextResponse("Error interno del servidor", { status: 500 });
    }
}