import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '~/request'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const items = await api.users.list()
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
