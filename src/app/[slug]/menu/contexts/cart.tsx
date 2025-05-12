"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct 
extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    total: number;
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    total: 0,
    toggleCart: () => { },
    addProduct: () => { },
    decreaseProductQuantity: () => { },
    increaseProductQuantity: () => { },
    removeProduct: () => { },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity
    }, 0);
    const toggleCart = () => {
        setIsOpen((prev) => !prev);
    }
    const addProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.some(prevProduct =>
            prevProduct.id === product.id);
        if (!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product]);
        }
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if (prevProducts.id === product.id) {
                    return {
                        ...prevProducts,
                        quantity: prevProducts.quantity + product.quantity
                    };
                }
                return prevProducts;
            })
        })
    };
    const decreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if (prevProducts.id === productId && prevProducts.quantity > 1) {
                    return { ...prevProducts, quantity: prevProducts.quantity - 1 };
                }
                return prevProducts;
            })
        })
    }
    const increaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if (prevProducts.id === productId) {
                    return { ...prevProducts, quantity: prevProducts.quantity + 1 };
                }
                return prevProducts;
            })
        })
    };
    const removeProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id !== productId));
        
    }
    return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toggleCart,
                addProduct,
                decreaseProductQuantity,
                increaseProductQuantity,
                removeProduct,
                total,
            }}>
            {children}
        </CartContext.Provider>
    )
}