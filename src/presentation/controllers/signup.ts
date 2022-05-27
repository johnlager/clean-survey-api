import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissigingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/badRequest'

export class SignUpController {
  handle (httpRequest: HttpRequest): any {
    const requiredFields = ['name', 'email']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissigingParamError(field))
      }
    }
  }
}
