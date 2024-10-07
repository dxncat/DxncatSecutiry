"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormAddElement.form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Earth, Eye, Shuffle } from "lucide-react"
import { useState } from "react"
import { generatePassword } from "@/lib/generatePassword"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { FormAddElementProps } from "./FormAddElement.types"
import { copyClipboard } from "@/lib/copyClipboard"
import { toast } from "@/hooks/use-toast"



export function FormAddElement(props: FormAddElementProps) {

    const { userId, closeDialog } = props

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            typeElement: "password",
            isFavorite: false,
            name: "",
            directory: "",
            username: "",
            password: "",
            urlWebsite: "",
            notes: "",
            userId,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/items", values)
            toast({ title: "Elemento guardado" })
            form.reset({
                typeElement: "password",
                isFavorite: false,
                name: "",
                directory: "",
                username: "",
                password: "",
                urlWebsite: "",
                notes: "",
            })
            closeDialog()
            router.refresh()
        } catch (error) {
            toast({
                title: "Algo a salido mal",
                variant: "destructive",
            })
        }
    }

    const generateRandomPassword = () => {
        const password = generatePassword()
        console.log(password)
        form.setValue("password", password)
    }

    const updateUrl = () => {
        form.setValue("urlWebsite", window.location.href)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 gap-y-2 gap-x-4 grid">
                    <FormField
                        control={form.control}
                        name="typeElement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Que tipo de elemento necesitas?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un directorio para tu contraseña" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Inicio de sesión">
                                            Inicio de sesión
                                        </SelectItem>
                                        <SelectItem value="Tarjeta de crédito">
                                            Tarjeta de crédito
                                        </SelectItem>
                                        <SelectItem value="Identidad">
                                            Identidad
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isFavorite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Quieres añadir como favorito?</FormLabel>
                                <div className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Marcar como favorito</FormLabel>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="directory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Directorio</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Elige el directorio" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Social">
                                            Social
                                        </SelectItem>
                                        <SelectItem value="Streaming">
                                            Streaming
                                        </SelectItem>
                                        <SelectItem value="Compras">
                                            Compras
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuario</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} />
                                        <Copy className="absolute top-3 right-4 cursor-pointer" size={18} onClick={() => copyClipboard(field.value)} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="urlWebsite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link del sitio</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} />
                                        <Earth className="absolute top-3 right-2 cursor-pointer" size={18} onClick={updateUrl} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex justify-between">Contraseña <Shuffle className="cursor-pointer" size={15} onClick={generateRandomPassword} /> </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} type={showPassword ? "text" : "password"} />
                                        <Eye className="absolute top-3 right-10 cursor-pointer" size={18} onClick={() => setShowPassword(!showPassword)} />
                                        <Copy className="absolute top-3 right-2 cursor-pointer" size={18} onClick={() => copyClipboard(field.value)} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <div className="text-slate-400 flex items-center justify-between text-sm">
                            Autenticación TOTP
                            <p className="px-3 bg-green-700 text-white rounded-lg text-xs mr-5">
                                Premium
                            </p>
                        </div>
                        <Input disabled />
                    </div>

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notas</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div />

                    <Button type="submit">Guardar</Button>
                </form>
            </Form>
        </div>
    )
}
