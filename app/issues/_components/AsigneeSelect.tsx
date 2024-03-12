'use client'

import { Select } from "@radix-ui/themes";

export function AsigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Tobias Marion</Select.Item>
          <Select.Item value="2">Fulano 1</Select.Item>
          <Select.Item value="3">Ciclano 2</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}