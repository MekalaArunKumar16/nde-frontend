import React from 'react'
import Hero from './_components/Hero'
import Tracking from './_components/Tracking'
import Power from './_components/Power'
import GetStarted from './_components/GetStarted'
import FAQs from '../domain/_components/FAQs'
import Tool from './_components/Tool'
import Navbar from '@/components/Navbar'
import SpotNowTable from './_components/SpotNowTable'

const page = () => {
  return (
    <div>
      <Hero/>
      <Tracking/>
      <Power/>
      <GetStarted/>
      <Tool/>
      <SpotNowTable/>
      <FAQs bgColor='bg-background-SpotNow-gettingStarted'/>
    </div>
  )
}

export default page