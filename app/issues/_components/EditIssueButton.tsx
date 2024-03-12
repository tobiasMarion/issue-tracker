import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <Link href={`/issues/${issueId}/edit`} className='flex gap-2 items-center w-full justify-center'>
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  )
}