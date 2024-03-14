import authOptions from '@/app/auth/authOptions'
import { IssueDetails } from '@/app/components'
import { DeleteIssueButton, EditIssueButton, AsigneeSelect } from '@/app/issues/_components'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  const validation = z.number().safeParse(parseInt(params.id))

  if (!validation.success) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: validation.data }
  })

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
        <Flex direction="column" gap="4">
          <AsigneeSelect issue={issue}/>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>
  )
}