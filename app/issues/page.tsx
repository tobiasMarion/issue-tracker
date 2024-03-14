import { Pagination } from '@/app/components';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { IssueTable } from './_components';
import { IssueActions } from './_components/IssueActions';
import { IssueQuery, columnNames } from './_components/IssueTable';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic'      // Data cache (○ -> λ)
// export const dynamic = 0                 // Full route cache (time to revalidate data [0 === 'force-dynamic'])

export const metadata: Metadata = {
  title: 'Issue Tracker | Issues List',
  description: 'View all project Issues'
}

interface Props {
  searchParams: IssueQuery
}


export default async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const where = { status }

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </Flex>
  )
}