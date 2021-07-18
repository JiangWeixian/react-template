import welcome from '../src'

describe('index', () => {
  test('hello world should console', () => {
    console.log = jest.fn()
    welcome()
    expect(console.log).toHaveBeenCalledWith('hello world')
  })
})
