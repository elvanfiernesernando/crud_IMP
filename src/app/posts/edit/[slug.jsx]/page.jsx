'use client'

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  CardBody,
  Card
} from '@chakra-ui/react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()
    return (
    <>
      <Box className='p-4'>
        <Card maxW='xl' w='100%'>
          <CardBody>
            <Box className='flex gap-1 items-center'>
              <MdKeyboardArrowLeft size={48} className='cursor-pointer' onClick={() => router.back()}/>
              <Heading className="text-[#02054B] text-md ">Edit Post</Heading>
            </Box>
            <Box className='p-3 gap-4'>
              <FormControl id="name">
                <FormLabel>Title</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<MdFormatColorText color="gray.800" />}
                  />
                  <Input type="text" size="md" />
                </InputGroup>
              </FormControl>
              <FormControl id="body">
                <FormLabel>Body</FormLabel>
                <Textarea
                  rows={14}
                  borderColor="gray.300"
                  _hover={{
                    borderRadius: 'gray.300',
                  }}
                />
              </FormControl>
              <FormControl id="name" className='flex gap-2 mt-4'>
                <button className='flex px-4 py-2 justify-center items-center outline-[#02054B] outline-1 outline rounded-md drop-shadow-dropdown-modal w-[100px] text-[#02054B]' onClick={() => router.back()}>
                  Cancel
                </button>
                <button className='flex px-4 py-2 justify-center items-center bg-[#02054B] rounded-md drop-shadow-dropdown-modal w-[100px] text-white' onClick={() => router.back()}>
                  Submit
                </button>
              </FormControl>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>

    );
  }