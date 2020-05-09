class GenericResponse<T> {
  private success: boolean
  private error: string
  private data: T | null

  constructor(success: boolean, error: string, data: T | null) {
    this.success = success
    this.error = error
    this.data = data
  }

  public static successResponse = <T>(data: T): GenericResponse<T> => {
    return new GenericResponse<T>(true, '', data)
  }

  public static errorResponse = <T>(message: string): GenericResponse<T> => {
    return new GenericResponse<T>(false, message, null)
  }
}

export default GenericResponse
