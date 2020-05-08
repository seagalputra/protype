import { Service, Inject } from 'typedi'

@Service()
class UserAccountRequest {
  constructor(
    @Inject('userRequest.name') private name: string,
    @Inject('userRequest.email') private email: string,
    @Inject('userRequest.password') private password: string
  ) {}

  public getName = (): string => {
    return this.name
  }

  public getEmail = (): string => {
    return this.email
  }

  public getPassword = (): string => {
    return this.password
  }
}

export default UserAccountRequest
