import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'


export function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return

  return (
    <Text color='red' as='p'>{children}</Text>
  )
}
