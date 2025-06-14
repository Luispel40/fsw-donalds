"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
    product: Pick<Product, "imageUrl" | "name">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
    const router = useRouter();
    const handleBackClick = () => router.back();
    return <>
    <div className="relative min-h-[300px] w-full">
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 left-4 z-50 rounded-full"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />
            </Button>
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-50 rounded-full"
            >
                <ScrollTextIcon />
            </Button>
            <Image
                src={product.imageUrl}
                fill
                alt={product.name}
                className="object-cover"
            />
        </div>
    </>;
}
 
export default ProductHeader;