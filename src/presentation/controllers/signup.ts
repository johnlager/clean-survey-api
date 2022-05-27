import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissigingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/badRequest'
import { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): any {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissigingParamError(field))
      }
    }
  }
}
