import { getServerSession } from "next-auth"
import { db } from "@/lib/db"

import { redirect } from "next/navigation"
import { DataTableItems } from "@/components/Shared/DataTableItems"

export default async function page() {

    const session = await getServerSession()

    if (!session || !session.user?.email) {
        return redirect("/login")
    }

    const user = await db.user.findUnique({
        where: {
            email: session?.user?.email
        },
        include: {
            elements: {
                where: {
                    isFavorite: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    if (!user || !user.elements) {
        return redirect("/login")
    }

    return (
        <div>
            <h1 className="text-xl md:text-3xl font-semibold">Lista de Favoritos</h1>
            <DataTableItems elements={user.elements} />
        </div>
    )
}
