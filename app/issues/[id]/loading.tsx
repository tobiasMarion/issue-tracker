import { Flex, Box, Card } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default async function LoadingIssueDetailPage() {

  return (
    <Box>
      <Skeleton className='max-w-xl'/>
      <Flex gap="4" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="8">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}