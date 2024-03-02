import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'

interface Props {
  href: string;
  children: String;
}

export function Link({ href, children }: Props) {
  return (
    <NextLink href={href} legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}