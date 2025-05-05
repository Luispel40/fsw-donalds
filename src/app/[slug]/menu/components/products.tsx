import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
    products: Product[];
}

const Products = ({ products }: ProductsProps) => {
    return (
        <div className="space-y-3 px-5">
            {products.map(product => (
                <Link
                    key={product.id} 
                    href="/" 
                    className="flex items-center justify-between gap-10 py-3 border-b py-5">
                    <div>
                        <h3 className="text-sm font-medium">
                            {product.name}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                        <p className="text-sm font-semibold pt-3">
                            {Intl.NumberFormat(
                                'pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(product.price)}
                        </p>
                    </div>
                    <div className="relative min-h-[120px] min-w-[82px]">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-contain"
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Products;