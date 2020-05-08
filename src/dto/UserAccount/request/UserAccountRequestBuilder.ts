import { Service, Container } from 'typedi'
import UserAccountRequest from './UserAccountRequest'

@Service()
class UserAccountRequestBuilder {
  private name: string
  private email: string
  private password: string

  public static anUserAccountRequestBuilder = (): UserAccountRequestBuilder => {
    return new UserAccountRequestBuilder()
  }

  public withName = (name: string): UserAccountRequestBuilder => {
    this.name = name
    return this
  }

  public withEmail = (email: string): UserAccountRequestBuilder => {
    this.email = email
    return this
  }

  public withPassword = (password: string): UserAccountRequestBuilder => {
    this.password = password
    return this
  }

  public build = (): UserAccountRequest => {
    Container.set('userRequest.name', this.name)
    Container.set('userRequest.email', this.email)
    Container.set('userRequest.password', this.password)
    return Container.get(UserAccountRequest)
  }
}

export default UserAccountRequestBuilder
