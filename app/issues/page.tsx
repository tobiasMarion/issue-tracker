import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { IssueActions } from './_components/IssueActions';
import { Status } from '@prisma/client';

export const dynamic = 'force-dynamic'      // Data cache (○ -> λ)
// export const dynamic = 0                 // Full route cache (time to revalidate data [0 === 'force-dynamic'])

interface Props {
  searchParams: { status: Status }
}


export default async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const issues = await prisma.issue.findMany({
    where: { status }
  })

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
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