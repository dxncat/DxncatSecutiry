import { Dispatch, SetStateAction } from "react"

export type PasswordGeneratorProps = {
    lengthPassword: number
    isMayusSelected: boolean
    isMinusSelected: boolean
    isSpecialCharacters: boolean
    isNumberSelected: boolean
    setLengthPassword: Dispatch<SetStateAction<number>>
    setIsMayusSelected: Dispatch<SetStateAction<boolean>>
    setIsMinusSelected: Dispatch<SetStateAction<boolean>>
    setIsSpecialCharacters: Dispatch<SetStateAction<boolean>>
    setIsNumberSelected: Dispatch<SetStateAction<boolean>>
}