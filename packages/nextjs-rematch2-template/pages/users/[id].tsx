import * as React from 'react'
import { NextPageContext } from 'next'

import { User } from '~/interfaces'
import Layout from '~/components/Layout'
import ListDetail from '~/components/ListDetail'
import { api } from '~/request'

type Props = {
  item?: User
  errors?: string
}

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query
      const item = await api.users.getUser(id as string)
      return { item }
    } catch (err) {
      return { errors: err.message }
    }
  }

  render() {
    const { item, errors } = this.props

    if (errors) {
      return (
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      )
    }

    return (
      <Layout title={`${item ? item.name : 'User Detail'} | Next.js + TypeScript Example`}>
        {item && <ListDetail item={item} />}
      </Layout>
    )
  }
}

export default InitialPropsDetail
