"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
    username: z.string().min(2).max(50),
})

export function SignUpForm() {

    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email: values.email,
                password: values.password,
                username: values.username,
            }),
        })

        if (response.status === 200) {
            router.push("/")
            toast({
                title: "Registro exitoso",
                description: "Usuario registrado correctamente."
            })
        } else {
            toast({
                title: "Error",
                description: "Ocurrió un error al registrar el usuario.",
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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de Usuario</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese aquí su nombre de usuario." {...field} />
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

                <Button type="submit" className="w-full">Registrarse</Button>
            </form>
        </Form>
    )
}
