import prisma from "@/prisma/client";
import { Button, Table, TableRow } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "../components/IssueStatusBadge";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany()

  return (
    <div>
      <div className="mb-5">
        <Button><Link href="/issues/new">New Issue</Link></Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <TableRow>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </TableRow>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <TableRow key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="block md:hidden"><IssueStatusBadge status={issue.status}/></div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </TableRow>
          ))}
        </Table.Body>
      </Table.Root>
    </div>

  )
}