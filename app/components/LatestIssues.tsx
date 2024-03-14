import prisma from "@/prisma/client"
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import { IssueStatusBadge } from "./"
import Link from "next/link"


export async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true
    }
  })

  return (
    <Card>
      <Heading size="4" mb="5">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(({ id, title, status, assignedToUser }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${id}`}>{title}</Link>
                    <IssueStatusBadge status={status} />
                  </Flex>

                  {assignedToUser && (
                    <Avatar
                      src={assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full" />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}