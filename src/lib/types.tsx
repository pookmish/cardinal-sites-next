export type Params = {
  slug: string | string[]
}

export type PageProps = {
  params: Params
  searchParams?: Record<string, string | string[] | undefined>
}
