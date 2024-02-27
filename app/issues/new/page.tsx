'use client'

import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { creasteIsuseScrema } from '@/app/validationSchemas'
import { z } from 'zod'
import { ErrorMessage } from '../../components/ErrorMessage'
import { Spinner } from '../../components/Spinner'

type IssueForm = z.infer<typeof creasteIsuseScrema>

export default function NewIssue() {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(creasteIsuseScrema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color="red" className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('An unexpected error has occurred')
            setIsSubmitting(false)
          }
        })}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description..." {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form >
    </div>
  )
}
