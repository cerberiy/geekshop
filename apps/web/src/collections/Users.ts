import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        // Payload's first-user endpoint bypasses collection access rules.
        // Only the private setup script may bootstrap an unauthenticated admin.
        if (operation === 'create' && !req.user && req.context.allowAdminBootstrap !== true) {
          throw new APIError('Administrator setup requires the private setup command.', 403)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
