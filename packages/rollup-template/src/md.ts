import { table } from 'functional-md'

export const Table = () => {
  return table({
    columns: [
      {
        dataIndex: 'id',
        title: 'ID',
      },
      {
        dataIndex: '',
        title: 'NAME',
        render: (v) => v.name,
      },
    ],
    dataSource: [
      {
        id: 1,
        name: 'jw',
      },
      {
        id: 2,
        name: 'jiangweixian',
      },
    ],
  })
}
