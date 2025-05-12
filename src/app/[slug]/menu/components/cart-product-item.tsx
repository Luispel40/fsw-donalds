import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
    product: CartProduct
}

const CartProductItem = ({ product }: CartItemProps) => {
    const {decreaseProductQuantity} = useContext(CartContext)
    return (
        <div className="flex items-center justify-between ">
            {/**Esquerda */}
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 bg-gray-100 rounded-xl ">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className=""
                    />
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                    {/**quantidade */}
                    <div className="flex items-center gap-1 text-center">
                        <Button 
                        className="w-6 h-6 p-0 rounded-xl" 
                        variant="outline"
                        onClick={() => decreaseProductQuantity(product.id)}
                        >
                            <ChevronLeftIcon size={16} />
                        </Button>
                        <p className="text-xs w-7">{product.quantity}</p>
                        <Button className="w-6 h-6 p-0 rounded-xl" variant="destructive">
                            <ChevronRightIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>
            {/**Direita */}
            <Button className="w-6 h-6 p-0 rounded-xl" variant="outline">
                <TrashIcon />
            </Button>
        </div>
    );
}

export default CartProductItem;