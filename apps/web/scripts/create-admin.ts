import config from '../payload.config'
import { getPayload } from 'payload'

const email = process.env.ADMIN_EMAIL?.trim()
const password = process.env.ADMIN_PASSWORD
if (!email || !password || password.length < 16) {
  throw new Error(
    'Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 16 characters) in .env.admin.local.',
  )
}

const payload = await getPayload({ config })
try {
  const existing = await payload.count({ collection: 'users' })
  if (existing.totalDocs > 0) {
    throw new Error('An administrator already exists. Use the admin panel to manage accounts.')
  }
  await payload.create({
    collection: 'users',
    context: { allowAdminBootstrap: true },
    data: { email, password },
  })
  console.log('Administrator created. Sign in at /admin.')
} finally {
  await payload.destroy()
}
