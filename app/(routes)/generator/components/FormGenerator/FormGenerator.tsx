"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { copyClipboard } from "@/lib/copyClipboard";
import { Copy, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { PasswordGenerator } from "./PassWordGenerator";
import { UserGenerator } from "../UserGenerator";
import { generateCustomPassword } from "@/lib/generateCustomPassword";
import { generateRandomUsername } from "@/lib/generateRandomUser";
import { generateRandomEmail } from "@/lib/generateRandomEmail";

export function FormGenerator() {

    const [selectedValue, setSelectedValue] = useState<"password" | "user" | string>("password");
    const [itemValueInput, setItemValueInput] = useState("")

    const [userTypeSelected, setUserTypeSelected] = useState("username")

    const [lengthPassword, setLengthPassword] = useState(11)
    const [isMayusSelected, setIsMayusSelected] = useState(true)
    const [isMinusSelected, setIsMinusSelected] = useState(true)
    const [isNumberSelected, setIsNumberSelected] = useState(true)
    const [isSpecialCharacters, setIsSpecialCharacters] = useState(true)

    useEffect(() => {
        if (selectedValue === "password") {
            const newPassword = generateCustomPassword(lengthPassword, isMayusSelected, isMinusSelected, isNumberSelected, isSpecialCharacters)
            setItemValueInput(newPassword)
        }
    }, [
        lengthPassword,
        isMayusSelected,
        isMinusSelected,
        isNumberSelected,
        isSpecialCharacters,
        selectedValue
    ])

    useEffect(() => {
        if (selectedValue === "user") {
            const newUserGenerated = generateRandomUsername()
            setItemValueInput(newUserGenerated)
        }
        if (userTypeSelected === "email") {
            const newEmailGenerated = generateRandomEmail()
            setItemValueInput(newEmailGenerated)
        }
    }, [selectedValue, userTypeSelected])

    const handleShuffleClick = () => {
        if (selectedValue === "password") {
            const password = generateCustomPassword(lengthPassword, isMayusSelected, isMinusSelected, isNumberSelected, isSpecialCharacters)
            setItemValueInput(password)
        } else if (selectedValue === "user") {
            if (userTypeSelected === "username") {
                const newUserGenerated = generateRandomUsername()
                setItemValueInput(newUserGenerated)
            } else {
                const newEmailGenerated = generateRandomEmail()
                setItemValueInput(newEmailGenerated)
            }
        }
    }

    return (
        <div className="mt-5 max-w-2xl">
            <div className="relative w-full">
                <Input placeholder="Contraseña..." value={itemValueInput} />
                <Copy className="absolute top-3 right-12 cursor-pointer size-5" onClick={() => copyClipboard(itemValueInput)} />
                <Shuffle className="absolute top-3 right-2 cursor-pointer size-5" onClick={handleShuffleClick} />
            </div>
            <div className="bg-slate-100 rounded-md shadow-md my-4 p-4">
                <p className="mb-4 text-slate-500">¿Que quieres generar?</p>
                <RadioGroup defaultValue="password" onValueChange={(value) => setSelectedValue(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="password" id="r1" />
                        <Label htmlFor="r1">Contraseña</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="r2" />
                        <Label htmlFor="r2">Usuario</Label>
                    </div>
                </RadioGroup>
            </div>
            {selectedValue === "password" ? (<PasswordGenerator
                isMayusSelected={isMayusSelected}
                isMinusSelected={isMinusSelected}
                isNumberSelected={isNumberSelected}
                isSpecialCharacters={isSpecialCharacters}
                lengthPassword={lengthPassword}
                setIsMayusSelected={setIsMayusSelected}
                setIsMinusSelected={setIsMinusSelected}
                setIsNumberSelected={setIsNumberSelected}
                setIsSpecialCharacters={setIsSpecialCharacters}
                setLengthPassword={setLengthPassword}
            />) : (<UserGenerator setUserTypeSelected={setUserTypeSelected} />)}

        </div>
    )
}
