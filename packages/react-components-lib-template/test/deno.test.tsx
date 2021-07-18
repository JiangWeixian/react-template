import React from 'react'
import renderer from 'react-test-renderer'
import Demo from '../components/demo'

describe('hello', () => {
  test('example jest with ts', () => {
    const component = renderer.create(<Demo />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
