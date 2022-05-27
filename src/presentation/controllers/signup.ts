import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissigingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/badRequest'

export class SignUpController {
  handle (httpRequest: HttpRequest): any {
    if (!httpRequest.body.name) {
      return badRequest(new MissigingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissigingParamError('email'))
    }

    return {}
  }
}
