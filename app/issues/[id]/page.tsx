import { IssueDetails } from '@/app/components'
import { DeleteIssueButton, EditIssueButton } from '@/app/issues/_components'
import prisma from '@/prisma/client'
import { Box, Grid, Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

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
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}