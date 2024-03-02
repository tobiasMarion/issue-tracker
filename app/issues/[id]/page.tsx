import prisma from "@/prisma/client"
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { IssueStatusBadge } from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'

interface Props {
  params: { id: string }
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) {
    notFound()
  }

  // await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="8">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  )
}