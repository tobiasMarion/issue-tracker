'use client'

import { Card } from "@radix-ui/themes"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts"

interface Props {
  open: number
  inProgress: number
  closed: number
}

interface columnChartData {
  label: string
  value: number
}

export function IssueChart({ open, inProgress, closed }: Props) {
  const data: columnChartData[] = [
    { label: 'Open', value: open },
    { label: 'In-progress', value: inProgress },
    { label: 'Closed', value: closed }
  ]

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} style={{fill: 'var(--accent-9)'}}/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}