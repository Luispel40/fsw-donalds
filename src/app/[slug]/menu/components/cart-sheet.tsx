"use client";

import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
    const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
    const { isOpen, toggleCart, products, total } = useContext(CartContext);
    return (<Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[80%]">
            <SheetHeader>
                <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <div className="py-5 flex flex-col h-full">
                <div className="flex-auto">
                    {products.map((product) => (
                        <CartProductItem key={product.id} product={product} />
                    ))}
                </div>
                <Card className="mb-6">
                    <CardContent className="p-5">
                        <div className="flex justify-between">
                            <p className="font-sm text-muted-foreground">total</p>
                            <p className="font-semibold text-sm">{formatCurrency(total)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Button
                onClick={() => setFinishOrderDialogIsOpen(true)}
                >
                    Finalizar Pedido
                </Button>
                    <FinishOrderDialog 
                    open={finishOrderDialogIsOpen} 
                    onOpenChange={setFinishOrderDialogIsOpen} 
                    />
            </div>
        </SheetContent>
    </Sheet>);
}

export default CartSheet;