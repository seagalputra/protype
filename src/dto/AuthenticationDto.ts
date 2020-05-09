export class AuthenticationResponse {
  token!: string | null
}

export class AuthenticationRequest {
  email!: string
  password!: string
}
