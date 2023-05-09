// app/providers.tsx
'use client'

import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Providers = ({children}) => {

  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6000
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </CacheProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export { Providers }