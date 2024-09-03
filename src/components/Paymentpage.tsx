import Image, { StaticImageData } from 'next/image';
import { CART } from '@/assets';
import { useState, useEffect } from 'react';
import { Accordion, AccordionItem } from "@nextui-org/accordion";

interface CartItem {
    product: string;
    productId: string;
    domainName?: string; 
    period?: string; 
    name?: string; 
    status?: string; 
    price?: {
        productId: string;
        tld: string;
        year: number;
        registerPrice: number;
        _id: string;
    }[];
}

interface Product {
    name: string;
    link: string;
    img: StaticImageData;
    price: string;
    domainName?: string;
    period?: string;
}

const PaymentPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);


    useEffect(() => {
        const fetchCartItems = () => {
            try {
                const savedCart = localStorage.getItem('cart');
                const cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

                const formattedProducts: Product[] = cartItems.map((item) => {
                    if (item.product === "Hosting") {
                        return {
                            name: "Hosting",
                            link: item.domainName || "Unknown Hosting",
                            img: CART.database, // Use the appropriate image
                            price: `₹ ${item.price}/-`, // Set Gsuite-specific price logic
                            domainName: item.domainName,
                            period: item.period,
                        };
                    } else if (item.product === "Gsuite") {
                        return {
                            name: "Gsuite",
                            link: item.domainName || "Unknown Gsuite Product",
                            img: CART.google, // Use the appropriate image
                            price: `₹ ${item.price}/-`, // Set Gsuite-specific price logic
                            domainName: item.domainName,
                            period: item.period,
                        };
                    } else {
                        return {
                            name: "Domain",
                            link: item.name || "Unknown Product",
                            img: CART.www, // Use the appropriate image
                            price: item.price ? `₹${item.price[0].registerPrice}` : "N/A",
                        };
                    }
                });

                setProducts(formattedProducts);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Calculate subtotal, tax, and total based on the products
    useEffect(() => {
        if (products.length > 0) {
            const calculatedSubtotal = products.reduce((acc, product) => {
                const price = parseFloat(product.price.replace(/[₹,]/g, ''));
                return acc + (isNaN(price) ? 0 : price);
            }, 0);

            const calculatedTax = calculatedSubtotal * 0.05; // Assuming 5% tax
            const calculatedTotal = calculatedSubtotal + calculatedTax;

            setSubtotal(calculatedSubtotal);
            setTax(calculatedTax);
            setTotal(calculatedTotal);
        }
    }, [products]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <div className='divide-y divide-gray-200'>
                <Accordion className='divide-y divide-gray-200'>
                    <AccordionItem key="1" title={`Order Summary (${products.length})`} className='divide-y divide-gray-200'>
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                                {products.length > 0 ? (
                                    products.map((product, index) => (
                                        <tr key={index}>
                                            <td className="flex items-center px-4 py-4 text-sm text-gray-800">
                                                <Image src={product.img} alt={product.name} className="w-12 h-12" />
                                                <div>
                                                    <h3 className="font-semibold">{product.name}</h3>
                                                    <a href={product.link} className="text-blue-500 text-sm">{product.link}</a>
                                                </div>
                                            </td>
                                            <td className="text-sm text-gray-800">
                                                {product.domainName ? (
                                                    <div>
                                                        {product.period && <p>{product.period}</p>}
                                                    </div>
                                                ) : "N/A"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-800">
                                                <div className='flex'>
                                                    <p className="font-semibold p-4">{product.price}</p>
                                                    <button className="text-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center text-gray-500 py-4">No items in cart.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </AccordionItem>
                </Accordion>
            </div>
            <table className="min-w-full divide-y divide-gray-200 pb-16">
                <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                    <tr>
                        <td className="text-sm text-gray-800 px-2">
                            <ul className='bg-white text-left'>
                                <li className=''></li>
                                <li className='py-1'>Subtotal</li>
                                <li className='py-1'>Tax</li>
                            </ul>
                        </td>
                        <td className="flex items-center px-4 py-4 text-sm text-blue-800"></td>
                        <td className="text-sm text-gray-800">
                            <ul className='bg-white text-center'>
                                <li className=''></li>
                                <li className='py-1'>₹ {subtotal.toFixed(2)}</li>
                                <li className='py-1'>₹ {tax.toFixed(2)}</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td className="flex items-center px-4 py-4 text-sm text-blue-800"></td>
                        <td className="text-sm text-gray-800">
                            <ul className='bg-white text-center'>
                                <li className='py-1 font-bold'>Total</li>
                            </ul>
                        </td>
                        <td className="text-sm text-gray-800">
                            <ul className='bg-white text-center'>
                                <li className='py-1 font-bold'>₹ {total.toFixed(2)}</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PaymentPage;
