'use client'

import { ErrorMessage, Spinner } from '@/app/components'
import { creasteIsuseScrema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueForm = z.infer<typeof creasteIsuseScrema>

export default async function NewIssue() {
  // await new Promise(resolve => setTimeout(resolve, 2000))

  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(creasteIsuseScrema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
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
