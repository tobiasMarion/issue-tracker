import prisma from "@/prisma/client"
import { IssueChart, IssueSummary, LatestIssues } from "./components/"

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
    <>
      <LatestIssues />
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    </>
  )
}
