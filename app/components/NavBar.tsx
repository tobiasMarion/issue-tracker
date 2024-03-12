'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

export function NavBar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/"><AiFillBug /></Link>
            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

function NavLinks() {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' }
  ]

  return (
    <ul className="flex space-x-6">
      {links.map((link, index) =>
        <li key={index}>
          <Link
            className={classNames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
            href={link.href}>{link.label}
          </Link>
        </li>)}
    </ul>
  )
}

function AuthStatus() {
  const { status, data: session } = useSession()

  if (status === "loading") return <Skeleton width="5rem" />
  if (status === "unauthenticated") {
    return <Link className="nav-link" href="/api/auth/signin">Log in</Link>
  }

  console.log(session)
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex gap="2" align="center" className="cursor-pointer">
            <Text size="2" className="nav-link">{session!.user!.name}</Text>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2" radius="full"
              referrerPolicy="no-referrer"
            />
          </Flex>

        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}