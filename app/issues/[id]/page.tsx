import authOptions from '@/app/auth/authOptions'
import { IssueDetails } from '@/app/components'
import { AsigneeSelect, DeleteIssueButton, EditIssueButton, StatusSelect } from '@/app/issues/_components'
import prisma from '@/prisma/client'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const fetchIssue = cache((issueId: number) => (
  prisma.issue.findUnique({ where: { id: issueId } })
))

interface Props {
  params: { id: string }
}

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  const validation = z.number().safeParse(parseInt(params.id))

  if (!validation.success) notFound()

  const issue = await fetchIssue(parseInt(params.id))

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {(session && issue.status !== 'CLOSED') && <Box>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="1">
            <Text>Current Status</Text>
            <StatusSelect issue={issue}/>
          </Flex>
          <Flex direction="column" gap="1">
            <Text>Assigned to</Text>
            <AsigneeSelect issue={issue} />
          </Flex>
          <Flex direction="column" gap="1">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Flex>
      </Box>}
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id))

  return {
    title: issue?.title,
    description: 'Detais of issue' + issue?.id
  }
}