'use client'

import { Skeleton } from "@/app/components/";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function AsigneeSelect() {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 1
  })

  if (isLoading) return <Skeleton />

  if (error) return null

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(({ id, name }) => (
            <Select.Item key={id} value={id}>{name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}