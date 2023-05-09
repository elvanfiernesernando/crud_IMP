'use client'

import { usePostsData } from '@/hooks/usePostsData'
import { Box, Stack, Heading, Text, Image, Button } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const page = ({params : { slug }, searchParams}) => {

	const { data: postsData } = usePostsData({
    _page: 1,
    _limit: 10
  }, searchParams.id)

	const router = useRouter()

  return (
		<>
		<Box className={'flex flex-col gap-4 p-4'}>
			<button className='flex gap-2 px-4 py-2 items-center bg-[#02054B] rounded-md drop-shadow-dropdown-modal w-[100px] text-white' onClick={() => router.back()}>
				<MdKeyboardArrowLeft/>
				Back
			</button>
			<Image
					className="w-full h-[600px] object-cover"
					src={`https://picsum.photos/id/${searchParams.id}/5000/3333.jpg`}
					alt={'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'}
					borderRadius='lg'
				/>
				<Stack mt='6' spacing='3'>
					<Heading size='md'>{postsData?.title}</Heading>
					<Text>
						{postsData?.body}
					</Text>
				</Stack>
			</Box>	
		</>
  )
}

export default page