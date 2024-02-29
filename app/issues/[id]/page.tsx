import React from 'react'
import prisma from "@/prisma/client"
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { IssueStatusBadge } from '@/app/components/IssueStatusBadge'

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

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        {issue.createdAt.toDateString()}
      </Card>
    </div>
  )
}