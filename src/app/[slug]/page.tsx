import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";
interface RestaurantPageProps {
    params: Promise<{ slug: string }>
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await db.restaurant.findUnique({ where: { slug: slug } });
    if (!restaurant) {
        return notFound()
    }
    return <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
        <div className="flex flex-col items-center gap-2">
            <Image
                src={restaurant.avatarImageUrl}
                alt={restaurant.name}
                width={82}
                height={82}
            />
            <h2 className="font-semibold">
                {restaurant.name}
            </h2>
        </div>
        <div className="pt-24 text-center space-y-2">
            <h3 className="text-2xl font-semibold">
                Seja Bem Vindo!
            </h3>
            <p className="opacity-55">
                Escolha como prefere aproveitar sua refeição. Estamos
                oferecer praticidade e sabor em cada detalhe!
            </p>
        </div>
        <div className="pt-14 grid grid-cols-2 gap-4">
            <ConsumptionMethodOption 
            slug={slug}
            option="DINE_IN"
            buttonText="Para comer aqui"
            imageUrl="/dine_in.png"
            imageAlt="Dine In"
            />
            <ConsumptionMethodOption 
            slug={slug}
            option="TAKEAWAY"
            buttonText="Para levar"
            imageUrl="/takeaway.png"
            imageAlt="Para Levar"
            />

        </div>
    </div>
}

export default RestaurantPage;