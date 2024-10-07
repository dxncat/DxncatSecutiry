"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { signIn } from 'next-auth/react'

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
import { useRouter } from "next/navigation"
import { Eye } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
    email: z.string().min(2).max(50).email(),
    password: z.string().min(2).max(50),
})

export function LoginForm() {

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        })

        if (response?.status === 200) {
            toast({
                title: "Inicio de sesión exitoso",
                description: "Usuario autenticado correctamente."
            })
            router.push("/")
        } else {
            toast({
                title: "Error",
                description: "Credenciales inválidas.",
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-5 space-y-3 text-black">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese aquí su correo." {...field} />
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
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input placeholder="Ingresa aquí tu contraseña" {...field} type={showPassword ? "text" : "password"} />
                                    <Eye className="absolute top-3 right-2 cursor-pointer" size={18} onClick={() => setShowPassword(!showPassword)} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Iniciar Sesión</Button>
            </form>
        </Form>
    )
}
