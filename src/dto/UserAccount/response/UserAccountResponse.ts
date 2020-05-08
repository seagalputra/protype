import { Service, Inject } from 'typedi'

@Service()
class UserAccountResponse {
  constructor(
    @Inject('userResponse.name') private name: string,
    @Inject('userResponse.email') private email: string
  ) {}

  public getName = (): string => {
    return this.name
  }

  public getEmail = (): string => {
    return this.email
  }
}

export default UserAccountResponse
