import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

export function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl">
      <Skeleton height='1.5rem'/>
      <Skeleton height="20rem"/>
    </Box>
  )
}