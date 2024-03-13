import { z } from 'zod'

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Title is required').max(65535, 'The new description is too long')
})

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, 'Title is required')
    .max(65535, 'The new description is too long')
    .optional(),
  assignToUserId: z
    .string()
    .min(1, "AssignToUserId is required")
    .max(255)
    .optional()
    .nullable()
})