import { InvalidParamError, MissigingParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { AddAccount, Controller, EmailValidator, HttpRequest, HttpResponse } from './signup-protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse | any> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissigingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
