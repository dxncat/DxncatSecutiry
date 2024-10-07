import { CreditCard, Earth, Landmark, LayoutList, Lock, Settings, Star, UserPen } from "lucide-react";

export const dataSidebarElements = [
    {
        title: "Elementos",
        icon: LayoutList,
        children: [
            {
                item: "Favoritos",
                href: "/favorites",
                icon: Star
            },
            {
                item: "Logins",
                href: "/logins-elements",
                icon: Earth
            },
            {
                item: "Tarjetas de Crédito",
                href: "/credit-card",
                icon: CreditCard
            }
        ]
    }
]

export const dataSidebarConfiguration = [{
    title: "Configuración",
    icon: Settings,
    children: [
        {
            item: "Perfil",
            href: "/profile",
            icon: UserPen,
            premium: false
        },
        {
            item: "Seguridad",
            href: "#",
            icon: Lock,
            premium: true
        },
        {
            item: "Suscripción",
            href: "#",
            icon: Landmark,
            premium: true
        }
    ]
}]