import { IssueStatusBadge, Link } from '@/app/components';
import NextLink from 'next/link'
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { IssueActions } from './_components/IssueActions';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

export const dynamic = 'force-dynamic'      // Data cache (○ -> λ)
// export const dynamic = 0                 // Full route cache (time to revalidate data [0 === 'force-dynamic'])

interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue
  }
}


export default async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const issues = await prisma.issue.findMany({
    where: { status }
  })

  const columns: {
    label: string,
    value: keyof Issue
    className?: string
  }[] = [
      { label: 'Issue', value: 'title' },
      { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
      { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
    ]

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}>
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden"><IssueStatusBadge status={issue.status} /></div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>

  )
}