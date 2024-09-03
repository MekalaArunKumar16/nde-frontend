import { ICONS, IMAGES } from '@/assets'
import Image from 'next/image'
import React from 'react'

const GetStarted = () => {
    return (
        <div className=' py-20 bg-background-SpotNow-gettingStarted'>
            <div className='flex justify-center'>
                <span className=' text-6xl font-900 text-home-heading font-roboto text-center'>Get Started with SpotNow in Minutes</span>
            </div>
            <div className='flex justify-center pt-8'>
                <span className=' text-center font-400 font-roboto-serif text-3xl w-[40vw]'>Increased efficiency, better management, and much more in no time! Just follow these four steps.</span>
            </div>
            <div className='flex justify-center py-20 gap-32'>
                <div className='flex flex-col gap-4 w-[320px]'>
                    <Image src={IMAGES.Checkcircle} alt='tick' />
                    <span className=' font-900 font-roboto text-home-heading text-3xl'>Create SpotNow Account</span>
                    <span className=' font-400 font-roboto-serif text-home-heading text-2xl tracking-tight'>Sign up and get started with your new SpotNow account. Enter your details, and you&apos;re all set to begin.</span>
                </div>
                <div className='flex flex-col gap-4 w-[320px]'>
                    <Image src={IMAGES.Checkcircle} alt='tick' />
                    <span className=' font-900 font-roboto text-home-heading text-3xl'>Create SpotNow Account</span>
                    <span className=' font-400 font-roboto-serif text-home-heading text-2xl tracking-tight'>Sign up and get started with your new SpotNow account. Enter your details, and you&apos;re all set to begin.</span>
                </div>
                <div className='flex flex-col gap-4 w-[320px]'>
                    <Image src={IMAGES.Checkcircle} alt='tick' />
                    <span className=' font-900 font-roboto text-home-heading text-3xl'>Create SpotNow Account</span>
                    <span className=' font-400 font-roboto-serif text-home-heading text-2xl tracking-tight'>Sign up and get started with your new SpotNow account. Enter your details, and you&apos;re all set to begin.</span>
                </div>
                <div className='flex flex-col gap-4 w-[320px]'>
                    <Image src={IMAGES.Checkcircle} alt='tick' />
                    <span className=' font-900 font-roboto text-home-heading text-3xl'>Create SpotNow Account</span>
                    <span className=' font-400 font-roboto-serif text-home-heading text-2xl tracking-tight'>Sign up and get started with your new SpotNow account. Enter your details, and you&apos;re all set to begin.</span>
                </div>
            </div>
        </div>
    )
}

export default GetStarted
