import { Environment } from 'vitest'

export default <Environment>(<unknown>{
  name: 'prisma',
  async setup() {
    return {
      tearDown() {},
    }
  },
})
