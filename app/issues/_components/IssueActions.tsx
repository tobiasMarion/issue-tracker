import { IssueStatusFilter } from '@/app/issues/_components';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

export function IssueActions() {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button><Link href="/issues/new">New Issue</Link></Button>
    </Flex>
  )
}