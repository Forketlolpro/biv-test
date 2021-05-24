export interface Response<T> {
  count: number,
  next?: string,
  previous?: string,
  results: T[]
}

export interface People {
  birth_year: string,
  eye_color: string,
  films: string[],
  gender: string,
  hair_color: string,
  height: string,
  homeworld: string,
  mass: string,
  name: string,
  skin_color: string,
  created: string,
  edited: string,
  species: string[],
  starships: string[],
  url: string,
  vehicles: string[]
}

export interface Homeworld {
  name: string,
  population: string
}

export interface Film {
  title: string,
  release_date: string
}

export interface Transport {
  name: string,
  model: string
}

export interface FullPeopleData {
  character: {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string
  },
  homeworld: Homeworld,
  films: Film[],
  transport?: {
    vehicles: Transport[],
    starships: Transport[]
  }
}
