"use client"
import React, { useState } from 'react';

// Define interfaces for props
interface PlanCardProps {
    name: string;
    price: string;
    isStarter: boolean;
}

interface PlanFeatureProps {
    title: string;
    starter: string;
    advanced: string;
    premium: string;
}

// PlanCard Component
const PlanCard: React.FC<PlanCardProps> = ({ name, price, isStarter }) => (
    <th className={`text-center py-2 lg:py-4 relative ${isStarter ? 'bg-[#EBEBFD]' : ''}`}>
        <div className="flex flex-col gap-2 lg:gap-4">
            <span className="font-900 text-xl lg:text-4xl text-home-heading">{name}</span>
            <span className="font-900">
                <sup className="text-lg lg:text-xl max-md:hidden">₹</sup>
                <span className="text-3xl lg:text-5xl">{price}</span>/month
            </span>
            <button className="bg-[#00B98B] p-2 lg:p-4 text-white text-md lg:text-2xl font-900 rounded-lg mx-auto max-md:mx-1">
                Add to cart
            </button>
        </div>
    </th>
);

// PlanFeature Component
const PlanFeature: React.FC<PlanFeatureProps> = ({ title, starter, advanced, premium }) => (
    <tr className="border-t-[1px] border-black border-opacity-65 font-roboto-serif">
        <td className="sticky left-0 bg-white text-home-heading tracking-tighter text-md px-1 lg:text-2xl text-start pl-4 lg:pl-10 font-400 py-2 lg:py-4">
            {title}
        </td>
        <td className="text-home-heading text-center bg-[#EBEBFD] py-2 lg:py-4 text-lg lg:text-2xl">{starter}</td>
        <td className="text-home-heading text-center py-2 lg:py-4 text-lg lg:text-2xl">{advanced}</td>
        <td className="text-home-heading text-center py-2 lg:py-4 text-lg lg:text-2xl">{premium}</td>
    </tr>
);

// Main Component: SpotNowTable
const SpotNowTable: React.FC = () => {
    const [isAnnually, setIsAnnually] = useState(false);

    const togglePricing = () => {
        setIsAnnually(!isAnnually);
    };

    return (
        <div className='bg-[#F3F4FD] py-24'>
            <div className='flex justify-center text-center'>
                <span
                    className={`cursor-pointer px-4 ${!isAnnually ? 'font-bold' : ''}`}
                    onClick={() => setIsAnnually(false)}
                >
                    Monthly
                </span>
                <label className="relative inline-flex items-center cursor-pointer mx-4">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isAnnually}
                        onChange={togglePricing}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <span
                    className={`cursor-pointer px-4 ${isAnnually ? 'font-bold' : ''}`}
                    onClick={() => setIsAnnually(true)}
                >
                    Annually
                </span>
            </div>
            <div className='flex justify-center text-center pt-10'>
                <span className='font-roboto-serif font-500 text-2xl'>Choose the Spot Now’s edition that best fits your business.</span>
            </div>
            <div className="px-0 lg:px-16 pb-10 pt-14">
                <div className="bg-white mx-0 lg:mx-14 overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead>
                            <tr>
                                <th className="sticky left-0 bg-white shadow-r-xl text-home-heading text-5xl font-roboto font-900 tracking-tighter text-center">
                                    Spot Now Features
                                </th>
                                <PlanCard name="Starter" price={isAnnually ? "670" : "67"} isStarter={true} />
                                <PlanCard name="Advanced" price={isAnnually ? "990" : "99"} isStarter={false} />
                                <PlanCard name="Premium" price={isAnnually ? "1490" : "149"} isStarter={false} />
                            </tr>
                        </thead>
                        <tbody>
                            <PlanFeature title="Host Websites" starter="1" advanced="50" premium="100" />
                            <PlanFeature title="SSD Storage (GB)" starter="50GB" advanced="100GB" premium="200GB" />
                            <PlanFeature title="Bandwidth" starter="Unlimited" advanced="Unlimited" premium="Unlimited" />
                            <PlanFeature title="Free .IN Domain (1st Year Only)" starter="1" advanced="" premium="1" />
                            <PlanFeature title="Subdomains" starter="5" advanced="100" premium="200" />
                            <PlanFeature title="FTP Users" starter="1" advanced="50" premium="100" />
                            <PlanFeature title="eMail Accounts" starter="2" advanced="50" premium="100" />
                            <PlanFeature title="Individual Mailbox Size (GB)" starter="1" advanced="1" premium="1" />
                            <PlanFeature title="Overall Mailbox Size (GB)" starter="2" advanced="50" premium="100" />
                            <PlanFeature title="Email Per Hour" starter="100" advanced="100" premium="100" />
                            <PlanFeature title="Email forwarding accounts" starter="Unlimited" advanced="Unlimited" premium="Unlimited" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SpotNowTable;
