import { Table, TableRow } from "@radix-ui/themes";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { IssueActions } from "./IssueActions";


export default async function IssuesPage() {
  const issues = [1, 2, 3, 4, 5]

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
            <TableRow key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden"><Skeleton /></div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton /></Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton /></Table.Cell>
            </TableRow>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}