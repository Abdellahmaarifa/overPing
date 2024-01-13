

export class JoinMatchmakingDto {
  readonly userId: number
  readonly matchType: string
}

export class RequestToPlayDto{
  readonly recipientId: number
  readonly matchType: string
}


export class RespondToPlayDto{
  readonly userId: number
  readonly recipientId: number
  readonly matchType: string
}