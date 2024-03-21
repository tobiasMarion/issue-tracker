'use client'

import { Issue, Status } from "@prisma/client";
import { AlertDialog, Button, Flex, Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";


export function StatusSelect({ issue }: { issue: Issue }) {
  const router = useRouter()
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(issue.status)

  async function changeStatus(newStatus: Status) {
    if (issue.status === 'CLOSED') {
      toast.error('You can not edit and closed issue.')
      return
    }

    try {
      await axios.patch(`/api/issues/${issue.id}`, { status: newStatus })
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }

  return (
    <>
      <Select.Root
        value={selectedValue} onValueChange={(newValue: Status) => {
          setSelectedValue(newValue)
          if (newValue === "CLOSED") {
            setIsAlertOpen(true)
            return
          }

          changeStatus(newValue)
        }}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Item value="OPEN">Open</Select.Item>
            <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
            <Select.Item value="CLOSED">Closed</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />

      <AlertDialog.Root open={isAlertOpen}>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm change</AlertDialog.Title>
          <AlertDialog.Description>Are you sure you want to change the status to CLOSED? This action cannot be undone.</AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="outline" color="gray" onClick={() => {
                setIsAlertOpen(false)
                setSelectedValue(issue.status)
              }}>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={() => changeStatus('CLOSED')}>Change to Closed</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}