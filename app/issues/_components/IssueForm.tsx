'use client'

import { ErrorMessage, Spinner } from '@/app/components'
import { creasteIsuseScrema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueFormData = z.infer<typeof creasteIsuseScrema>

interface Props {
  issue?: Issue
}

export async function IssueForm({ issue }: Props) {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(creasteIsuseScrema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      const newIssue: Issue = (await axios.post('/api/issues', data)).data
      router.push(`/issues/${newIssue.id}`)
      
    } catch (error) {
      setError('An unexpected error has occurred')
      setIsSubmitting(false)
    }
  })

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color="red" className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder='Title'
            {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder="Description..." {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form >
    </div>
  )
}
