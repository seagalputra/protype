import { Service, Container } from 'typedi'
import UserAccountResponse from './UserAccountResponse'

@Service()
class UserAccountResponseBuilder {
  private name!: string
  private email!: string

  public static anUserAccountResponseBuilder = (): UserAccountResponseBuilder => {
    return Container.get(UserAccountResponseBuilder)
  }

  public withName = (name: string): UserAccountResponseBuilder => {
    this.name = name
    return this
  }

  public withEmail = (email: string): UserAccountResponseBuilder => {
    this.email = email
    return this
  }

  public build = (): UserAccountResponse => {
    Container.set('userResponse.name', this.name)
    Container.set('userResponse.email', this.email)
    return Container.get(UserAccountResponse)
  }
}

export default UserAccountResponseBuilder
