import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '~/request'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const selected = await api.users.getUser(id as string)
    res.status(200).json(selected)
  } catch (err) {
    res.status(404).json({ statusCode: 404, message: err.message })
  }
}
