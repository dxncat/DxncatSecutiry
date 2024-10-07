import { getServerSession } from "next-auth";
import { FormGenerator } from "./components/FormGenerator";
import { HeaderGenerator } from "./components/HeaderGenerator";
import { redirect } from "next/navigation";

export default async function page() {

    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return redirect("/");
    }

    return (
        <div>
            <HeaderGenerator />
            <FormGenerator />
        </div>
    )
}