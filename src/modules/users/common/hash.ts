import { hash } from 'bcryptjs'

export async function hashWithSalt(value: string) {
  return hash(value, 6)
}
