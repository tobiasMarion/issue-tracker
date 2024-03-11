import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Heading, Flex, Card, Box, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';


export function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="8">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  )
}