import path from 'path'


export async function apiFetch<T> (
  uri: string,
  options: any
) : Promise<T> 
{
  const API_URI: string = process.env.NEXT_PUBLIC_API_URI as string
  const URI: string = new URL(path.join(API_URI, uri)).href as string

  const response: Response = await fetch(
    URI,
    options
  )

  return response.json() as T
}