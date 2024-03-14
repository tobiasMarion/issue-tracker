import prisma from "@/prisma/client"
import { IssueChart, IssueSummary, LatestIssues } from "./components/"
import { Flex, Grid } from "@radix-ui/themes"
import { Metadata } from "next"

export const dynamic = 'force-dynamic'      // Data cache (○ -> λ)

export const metadata: Metadata = {
  title: 'Issue Tracker | Dashboard',
  description: 'View a summary of project issues'
}

interface Props {
  searchParams: {
    page: string
  }
}

export default async function Home({ searchParams }: Props) {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues/>
    </Grid>
  )
}
