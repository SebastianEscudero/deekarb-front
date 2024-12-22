'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Deekarb Blog',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [deskTool()],

  schema: {
    types: schema.types,
  },
})
