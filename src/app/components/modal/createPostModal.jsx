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
  Card,
  FormErrorMessage
} from '@chakra-ui/react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function CreatePostModal({posts, setPosts}) {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
      console.info(data)

      mutation.mutate(data)
    }

    // create data
    const mutation = useMutation({
      mutationFn: async (data) => {
        console.info(data)
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            ...data
          }, {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
          }
        )
          .then((res) => {
            if(res !== 201){
              return alert("Oops! Please try again.")
            } else {
              console.log(res)
              setPosts([
                ...posts, {
                    res
                }
              ])
            }
          });
    }})

    return (
    <>
        <Card maxW='xl' w='100%'>
            <CardBody>
            <Box className='flex gap-1 items-center'>
                <MdKeyboardArrowLeft size={48} className='cursor-pointer' onClick={() => router.back()}/>
                <Heading className="text-[#02054B] text-md ">Create Post {state}</Heading>
            </Box>
            <form className='p-3 gap-4' onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="title" isInvalid={errors.title}>
                <FormLabel htmlFor='title'>Title</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                    {/* <InputLeftElement
                    pointerEvents="none"
                    // children={<MdFormatColorText color="gray.800" />}
                    /> */}
                    <Input 
                    type="text" 
                    size="md" 
                    id='title'
                    placeholder='title'
                    {...register('title', {
                        required: 'This is required',
                        minLength: { value: 6, message: 'Minimum length should be 6' },
                    })}
                    />
                </InputGroup>
                <FormErrorMessage>
                    {errors.title && errors.title.message}
                </FormErrorMessage>
                </FormControl>
                <FormControl id="body" isInvalid={errors.body}>
                <FormLabel>Body</FormLabel>
                <Textarea
                    rows={14}
                    borderColor="gray.300"
                    _hover={{
                    borderRadius: 'gray.300',
                    }}
                    id='body'
                    placeholder='body'
                    {...register('body', {
                    required: 'This is required',
                    })}
                />
                <FormErrorMessage>
                    {errors.body && errors.body.message}
                </FormErrorMessage>
                </FormControl>
                <FormControl id="name" className='flex gap-2 mt-4'>
                <button className='flex px-4 py-2 justify-center items-center outline-[#02054B] outline-1 outline rounded-md drop-shadow-dropdown-modal w-[100px] text-[#02054B]' onClick={() => router.back()}>
                    Cancel
                </button>
                <button className='flex px-4 py-2 justify-center items-center bg-[#02054B] rounded-md drop-shadow-dropdown-modal w-[100px] text-white' onClick={() => router.back()}>
                    Submit
                </button>
                </FormControl>
            </form>
            </CardBody>
        </Card>
    </>

    );
  }