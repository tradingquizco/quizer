"use client"

import PackCard from '@/components/PackCard'
import PacksContainer from '@/components/packsContainer'
import { Divider, Flex, Layout } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

const page = () => {
  return (
    <Layout className='bg-white'>
      <PacksContainer />
    </Layout>
  )
}

export default page