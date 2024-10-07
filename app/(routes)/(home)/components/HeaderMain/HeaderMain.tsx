"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Icon } from "lucide-react"
import { dataHeaderMain } from "./HeaderMain.data"
import { HeaderMainProps, TypeElement } from "./HeaderMain.types"
import { useState } from "react"
import { FormAddElement } from "../FormAddElement"



export function HeaderMain(props: HeaderMainProps) {

    const { userId } = props
    const [typeElement, setTypeElement] = useState<TypeElement>()
    const [openDialog, setOpenDialog] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)

    const closeDialogAndDropdown = () => {
        setOpenDialog(false)
        setOpenDropdown(false)
    }

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-semibold">Todas las cajas fuertes</h1>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            Añadir <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-0">
                        <DropdownMenuLabel>
                            <DialogTrigger asChild>
                                <div className="flex flex-col">
                                    {dataHeaderMain.map(({ icon: Icon, text, typeElement }) => (
                                        <Button key={typeElement} className="justify-start" variant="ghost" onClick={() => setTypeElement(typeElement)} >
                                            <Icon className="size-4 mr-2" />
                                            {text}
                                        </Button>
                                    ))}
                                </div>
                            </DialogTrigger>
                        </DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent className="sm:max-w-[825px]">
                    <DialogHeader>
                        <DialogTitle>Nuevo Elemento</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Por favor, complete los detalles del nuevo elemento a continuación.
                    </DialogDescription>
                    {typeElement === "password" && (<FormAddElement userId={userId} closeDialog={closeDialogAndDropdown} />)}
                </DialogContent>
            </Dialog>
        </div>

    )
}
