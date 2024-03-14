import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number
  inProgress: number
  closed: number
}

interface StatusCardProps {
  label: string
  value: number
  status: Status
}

export function IssueSummary({ open, inProgress, closed }: Props) {
  const statusCard: StatusCardProps[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Open Issues', value: closed, status: 'CLOSED' }
  ]

  return (
    <Flex gap="4">
      {statusCard.map(status => (
        <Link className="flex-1" href={`/issues?status=${status.status}`} key={status.status}>
          <Card className="h-full">
            <Flex className="h-full" direction="column" justify="between" gap="1">
              <Text className="text-sm font-light">{status.label}</Text>
              <Text size="5" className="font-bold">{status.value}</Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  )
}