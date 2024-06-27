import { Gym, GymRepository } from '@gyms/repositories/interface'

interface SearchGymsServiceInput {
  query: string
  page: number
}

interface SearchGymsServiceOutput {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private repository: GymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsServiceInput): Promise<SearchGymsServiceOutput> {
    const gyms = await this.repository.findMany(query, page)

    return {
      gyms,
    }
  }
}
