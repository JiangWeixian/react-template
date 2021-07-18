import React from 'react'
import renderer from 'react-test-renderer'
import List from '../components/List'

describe('hello', () => {
  test('example jest with ts', () => {
    const component = renderer.create(<List />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
