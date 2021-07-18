/**
 * @jest-environment node
 */
import compiler from './compiler'

describe('webpack loader', () => {
  test('exclude', async () => {
    const stats = await compiler('./test.js', { exclude: ['./option.test.ts'] })
    const output = stats!.toJson({ source: true }).modules![0].source
    console.log(output)

    // expect(output).toBe('export default "Hey Alice!\\n"');
  })
})
