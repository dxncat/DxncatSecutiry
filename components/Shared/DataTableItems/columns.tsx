"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { Element } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Copy, MoreHorizontal, User } from "lucide-react"

export type ColumnsProps = Element

export const columns: ColumnDef<ColumnsProps>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "typeElement",
        header: "Tipo de Elemento",
    },
    {
        accessorKey: "urlWebsite",
        header: "Link del Sitio",
    },
    {
        accessorKey: "directory",
        header: "Directorio",
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const password = row.original.password
            const username = row.original.username

            const onEditElement = () => {
                window.location.href = `/element/${row.original.id}`
            }

            const copyItemClipboard = (item: string, name: string) => {
                navigator.clipboard.writeText(item)
                toast({
                    title: "Copiado ✅",
                    description: `${name} copiado al portapapeles.`,
                })
            }

            return (
                <div className="flex gap-2 justify-center items-center">
                    {password && (
                        <Copy
                            className="size-4 cursor-pointer"
                            onClick={() => copyItemClipboard(password, "Password")}
                        />
                    )}
                    {username && (
                        <User
                            className="size-4 cursor-pointer"
                            onClick={() => copyItemClipboard(username, "Username")}
                        />
                    )
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-8 p-0">
                                <span className="sr-only">Abrir Menu </span>
                                <MoreHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={onEditElement}>
                                Editar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    },
]
