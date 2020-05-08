type GenericResponse<T> = {
  success: boolean
  error: string
  data: T | null
}

export default GenericResponse
