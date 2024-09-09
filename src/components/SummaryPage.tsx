import Image, { StaticImageData } from 'next/image';
import { CART } from '@/assets';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

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
    }[] | number; // price can either be an array (for domain) or a number (for other products)
}

interface Product {
    name: string;
    link: string;
    img: StaticImageData;
    price: string; // Ensure this is a string for display purposes
    domainName?: string;
    period?: string;
}

const SummaryPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const token = useSelector((state: any) => state.auth.token);

    // Function to fetch data from API for logged-in users
    const fetchCartFromAPI = async () => {
        const response = await axios.get('https://liveserver.nowdigitaleasy.com:5000/cart')
        return response.data;
    };

    // Use React Query to fetch the cart data for logged-in users
    const { data: apiCartData, isLoading: apiLoading } = useQuery({
        queryKey: ['cartData'],
        queryFn: fetchCartFromAPI,
        enabled: isAuthenticated, // Only run the query if the user is authenticated
    });

    useEffect(() => {
        const fetchCartItems = () => {
            try {
                if (!isAuthenticated) {
                    // Not logged in, fetch cart from localStorage
                    const savedCart = localStorage.getItem('cart');
                    const cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

                    const formattedProducts: Product[] = cartItems.map((item) => {
                        let priceValue = '';

                        if (typeof item.price === 'number') {
                            priceValue = `₹ ${item.price}/-`;
                        } else if (Array.isArray(item.price)) {
                            const registerPrice = item.price[0]?.registerPrice;
                            priceValue = registerPrice ? `₹ ${registerPrice}/-` : '₹ 0/-';
                        }

                        if (item.product?.toLowerCase() === 'hosting') {
                            return {
                                name: 'Hosting',
                                link: item.domainName || 'Unknown Hosting',
                                img: CART.database,
                                price: priceValue || '₹ 1000/-', // Fallback price
                                domainName: item.domainName,
                                period: item.period,
                            };
                        } else if (item.product?.toLowerCase() === 'gsuite') {
                            return {
                                name: 'Gsuite',
                                link: item.domainName || 'Unknown Gsuite Product',
                                img: CART.google,
                                price: priceValue || '₹ 2500/-', // Fallback price
                                domainName: item.domainName,
                                period: item.period,
                            };
                        } else if (item.product?.toLowerCase() === 'domain') {
                            return {
                                name: item.domainName || 'Domain',
                                link: item.domainName || 'Unknown Product',
                                img: CART.www,
                                price: priceValue || '₹ 500/-', // Fallback price
                                period: '1 year', // Assuming 1 year for demonstration
                            };
                        }
                        return null; // For products that don't match, return null
                    }).filter(Boolean) as Product[]; // Filter out null values

                    setProducts(formattedProducts);
                } else if (apiCartData) {
                    // Logged in, use API data
                    const formattedProducts: Product[] = apiCartData.products.map((item: any) => {
                        let priceValue = '';

                        console.log(item)

                        if (item.product.toLowerCase() === 'hosting') {
                            priceValue = `₹ ${item.pleskPrice}/-`;
                        } else if (item.product.toLowerCase() === 'gsuite') {
                            priceValue = `₹ ${item.gsuitePrice}/-`;
                        } else if (item.product.toLowerCase() === 'domain') {
                            priceValue = `₹ ${item.pleskPrice}/-`;
                        }

                        return {
                            name: item.product || 'Unknown Product',
                            link: item.domainName || 'Unknown Product',
                            img: item.product.toLowerCase() === 'hosting' ? CART.database : CART.google,
                            price: priceValue,
                            domainName: item.domainName,
                            period: item.period,
                        };
                    });
                    setProducts(formattedProducts);
                    setSubtotal(apiCartData.subTotal);
                    setTax(apiCartData.gst.cgst.Amt + apiCartData.gst.sgst.Amt);
                    setTotal(apiCartData.Total);

                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [isAuthenticated, apiCartData]);

    if (loading || apiLoading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="overflow-x-auto">
            {products.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-center">
                    <p className="text-lg font-semibold text-gray-500">Your cart is empty.</p>
                </div>
            ) : (
                <div>
                    <table className="min-w-full divide-y divide-gray-200 pb-10">
                        <thead className="bg-white text-center whitespace-nowrap">
                            <tr >
                                <th className="py-4 text-xs md:text-sm lg:text-base font-bold text-black">Product</th>
                                <th className="text-xs md:text-sm lg:text-base font-bold text-black tracking-wider">Duration</th>
                                <th className="text-xs md:text-sm lg:text-base font-bold text-black tracking-wider">Price</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product, index) => (
                                <tr key={index} className=' tracking-tighter'>
                                    <td className="flex items-center px-4 py-4 text-sm md:text-base lg:text-lg text-gray-800">
                                        <Image src={product.img} alt={product.name} className="w-6 h-6 md:w-12 md:h-12 lg:w-12 lg:h-12" />
                                        <div className="ml-2">
                                            <h3 className="text-xs md:text-sm lg:text-base font-semibold">{product.name}</h3>
                                            <a href={product.link} className="text-blue-500 text-xs md:text-sm lg:text-base">{product.link}</a>
                                        </div>
                                    </td>
                                    <td className="text-sm md:text-base lg:text-lg text-gray-800">
                                        {product.period && <p>{product.period}</p>}
                                    </td>
                                    <td className="text-sm md:text-base lg:text-lg text-gray-800">
                                        <div className="flex items-center justify-around gap-1">
                                            <p className="font-semibold">{product.price}</p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="min-w-full divide-y divide-gray-200 tracking-tighter">
                        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                            <tr>
                                <td className="text-sm text-gray-800 px-10 max-md:px-2">
                                    <ul className='bg-white text-left'>
                                        <li className='py-1 font-900 text-xl'>Subtotal</li>
                                        <li className='py-1 font-900 text-xl'>Tax</li>
                                    </ul>
                                </td>
                                <td className="flex items-center px-4 py-4 text-sm text-blue-800"></td>
                                <td className="text-sm text-gray-800">
                                    <ul className='bg-white text-center'>
                                        <li className='py-2 text-xl'>₹{subtotal.toFixed(2)}</li>
                                        <li className='py-2 text-xl'>₹{tax.toFixed(2)}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="flex items-center px-4 py-4 text-sm text-blue-800"></td>
                                <td className="text-sm text-gray-800">
                                    <ul className='bg-white text-center'>
                                        <li className='py-2 font-900 text-xl'>Total</li>
                                    </ul>
                                </td>
                                <td className="text-sm text-gray-800">
                                    <ul className='bg-white text-center'>
                                        <li className='py-4 text-xl'>₹{total.toFixed(2)}</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SummaryPage;
