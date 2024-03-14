'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
]

export function IssueStatusFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function filterIssues(status:Status | 'ALL') {
    const params = new URLSearchParams()
    if (status !== 'ALL') params.append('status', status)
    if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)
    
    const query = params.size ? '?' + params.toString() : ''
    router.push('/issues' + query)
  }

  return (
    <Select.Root defaultValue={searchParams.get('status') || 'ALL'} onValueChange={filterIssues}>
      <Select.Trigger placeholder='Filter by status ...' />
      <Select.Content>
        {statuses.map(({ value, label }) => (
          <Select.Item key={value} value={value}>{label}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}