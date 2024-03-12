'use client'

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

export function AsigneeSelect() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get<User[]>('/api/users')
      setUsers(data)
    }
    
    fetchUsers()
  }, [])



  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map(({ id, name }) => (
            <Select.Item key={id} value={id}>{name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}