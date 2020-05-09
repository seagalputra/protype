import { Service } from 'typedi'
import GenericResponse from '../../dto/GenericResponse'

@Service()
class BaseController {
  protected successResponse = <T>(data: T): GenericResponse<T> => {
    return {
      success: true,
      error: '',
      data,
    }
  }

  protected errorResponse = <T>(error: string): GenericResponse<T> => {
    return {
      success: false,
      error,
      data: null,
    }
  }
}

export default BaseController
