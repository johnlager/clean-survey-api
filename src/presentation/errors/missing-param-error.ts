export class MissigingParamError extends Error {
  constructor (paramName: string) {
    super(`Missiging param: ${paramName}`)
    this.name = 'MissingParam'
  }
}
