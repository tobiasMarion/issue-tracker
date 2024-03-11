import { Button } from "@radix-ui/themes";

export function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color="red">Delete Issue</Button>
  )
}