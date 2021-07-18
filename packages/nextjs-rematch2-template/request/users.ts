import { get } from '~/utils/api'

export namespace Users {
  export type Item = {
    id: number
    name: string
  }
}

export const users = {
  async list(): Promise<Users.Item[]> {
    return get('/users')
  },
  async getUser(id: string): Promise<Users.Item> {
    return get(`/users/${id}`)
  },
}
