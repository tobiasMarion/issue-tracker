'use client'

import { Skeleton } from "@/app/components/";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export function AsigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 1
  })

  if (isLoading) return <Skeleton />

  if (error) return null

  async function assignIssue(userId: string) {
    try {
      await axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId === 'UNASSIGNED' ? null : userId })
    } catch (error) {
      toast.error('Changes could not be saved.')
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'UNASSIGNED'}
        onValueChange={assignIssue}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="UNASSIGNED">Unassigned</Select.Item>
            {users?.map(({ id, name }) => (
              <Select.Item key={id} value={id}>{name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  )
}