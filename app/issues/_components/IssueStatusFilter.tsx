'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const statuses: { label: string, value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
]

export function IssueStatusFilter() {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by status ...' />
      <Select.Content>
        {statuses.map(({ value, label }) => (
          <Select.Item key={value} value={value}>{label}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}