export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-08'
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID='obym4sfw'
  process.env.NEXT_PUBLIC_SANITY_DATASET='localblog'
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
