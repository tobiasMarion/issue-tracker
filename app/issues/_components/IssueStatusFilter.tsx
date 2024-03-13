'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
]

export function IssueStatusFilter() {
  const router = useRouter()

  function filterIssues(status:Status | 'ALL') {
    console.log(status)
    const query = status === 'ALL' ? '' : `?status=${status}`
    router.push('/issues' + query)
  }

  return (
    <Select.Root onValueChange={filterIssues}>
      <Select.Trigger placeholder='Filter by status ...' />
      <Select.Content>
        {statuses.map(({ value, label }) => (
          <Select.Item key={value} value={value}>{label}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}