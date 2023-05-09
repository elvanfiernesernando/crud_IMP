"use client";

import React, { useEffect, useState } from "react";
import { usePostsData } from "@/hooks/usePostsData";
import { Card, Heading, CardBody, Text, Stack, Image, Grid, Box, Spinner } from '@chakra-ui/react'
import { Link } from "@chakra-ui/next-js";
import { createSlug } from "@/utils";
import { MdDriveFileRenameOutline, MdDeleteForever, MdMode } from 'react-icons/md'
import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils";
import axios from "axios";
import CreatePostModal from "../components/modal/CreatePostModal";


const Post = () => {

  const [ posts, setPosts ] = useState([])
  const [ showModal, setShowModal ] = useState({
    createModal: false
  })
  const [coba, setCoba] = useState("Dolan")

  const { data: postsData, isLoading: postsIsLoading, refetch: postsDataRefetch } = usePostsData()

  useEffect(()=>{
    setPosts(postsData)
  }, [postsData])

  // delete data
  const mutation = useMutation({
    mutationFn: async (id) => {
      console.info(id)
     return await api.delete(`/posts/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }
    )
      .then((res) => {
        if(res.status !== 200){
          return alert("Oops! Please try again.")
        } else {
          alert("Post deleted!")
          setPosts(posts.filter((post)=>{
            return post.id !== id
          }))
        }
      });
  }})

  // create data
  // const mutation = useMutation({
  //   mutationFn: async (data) => {
  //     console.info(data)
  //    return await axios.post('https://jsonplaceholder.typicode.com/posts', {
  //       ...data
  //     }, {
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       }
  //     }
  //   )
  //     .then((json) => console.log(json));
  // }})

  // update data
  // const mutation = useMutation({
  //   mutationFn: async (data) => {
  //     console.info(data)
  //    return await api.patch('https://jsonplaceholder.typicode.com/posts/1', {
  //     ...data
  //    },{
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       }
  //     }
  //   )
  //     .then((json) => console.log(json));
  // }})

  return (
    <>
      {postsIsLoading ? (
        <Box className="h-screen w-screen flex justify-center items-center">
          <Spinner className="w-[300px] h-[300]"/>
        </Box>
      ) : (
        <Box className="flex flex-col gap-4 p-4 relative">
          <Box className="fixed bottom-8 right-8 z-10 flex justify-center items-center animate-bounce flex-col gap-2">
            <Heading className="text-[#02054B] text-md ">Create Post Here!</Heading>
            <button
              button onClick={()=>{
                setShowModal({
                  createModal: true
                })
              }}
              className={'bg-[#02054B] text-2xl p-5 rounded-full text-white'}
            ><MdDriveFileRenameOutline /></button>
          </Box>
          <Grid templateColumns='repeat(4, 1fr)' gap={6}>
            {posts?.map((e)=>{
              return (
                <Card maxW='sm' key={e.id} w='100%'>
                  <CardBody>
                    <Image
                      className="w-full object-cover"
                      src={`https://picsum.photos/id/${e.id}/5000/3333.jpg`}
                      alt={e.title}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='4'>
                      <Heading size='md' className="text-[#02054B] capitalize">{e.title}</Heading>
                      <Text>
                        {e.body}
                      </Text>
                      <Box className="flex justify-between">
                        <Link href={{
                          pathname: `/posts/${createSlug(e.title)}`,
                          query: {
                            id: e.id
                          }
                        }} fontSize='lg' className="cursor-pointer text-[#484eec]">
                          Read more
                        </Link>

                        <Box className="flex gap-2">
                          <button 
                            button onClick={()=>{
                              setShowModal({
                                createModal: true
                              })
                            }}
                            className="text-white bg-purple-500 p-2 text-md rounded-md" ><MdMode /></button>
                            
                            {/* delete data */}
                            <button className="text-white bg-red-500 p-2 text-md rounded-md" onClick={() => mutation.mutate(
                              e.id,
                            )}><MdDeleteForever /></button>

                          {/* create data */}
                          {/* <button className="text-white bg-red-500 p-2 text-md rounded-md" onClick={() => mutation.mutate({
                            title: 'coba2',
                            body: 'bar',
                            userId: 1,
                          })}><MdDeleteForever /></button> */}

                          {/* update data */}
                          {/* <button className="text-white bg-red-500 p-2 text-md rounded-md" onClick={() => mutation.mutate({
                            id: 1,
                            title: 'coba2',
                            body: 'bar',
                            userId: 1,
                          })}><MdDeleteForever /></button> */}
                        </Box>

                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              )
            })}
          </Grid>

          {showModal.createModal && (
            <Box state={coba} className="w-screen h-screen fixed top-0 left-0 right-0 z-[20] flex justify-center items-center">
              <CreatePostModal state={posts} setPosts={setPosts}/>

              {/* background modal */}
              <div className='w-screen h-screen absolute z-[-1] backdrop-brightness-50 backdrop-blur-sm' onClick={()=>{
                setShowModal({
                  createModal: false
                })
              }}></div>
            </Box>
          )}

        </Box>
      )}
    </>
  )
} 

export default Post