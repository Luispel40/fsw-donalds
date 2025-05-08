import Link from "next/link";

import { Button } from "@/components/ui/button";

const ProductsPage = () => {
    return <div className="p-5 flex flex-col items-center justify-center h-full">
        <h1 className="text-red-500">Início</h1>
        <Button>
            <Link href="/fsw-donalds">fsw-donalds</Link>
        </Button>
    </div>;
}
 
export default ProductsPage;
