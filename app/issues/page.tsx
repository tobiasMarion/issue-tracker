import prisma from "@/prisma/client";
import { Table, TableRow } from "@radix-ui/themes";
import { IssueStatusBadge } from "../components/IssueStatusBadge";
import { IssueActions } from "./IssueActions";
import Link from "next/link";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany()
  await new Promise(resolve => setTimeout(resolve, 250))


  return (
    <div>
      <IssueActions />

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
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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