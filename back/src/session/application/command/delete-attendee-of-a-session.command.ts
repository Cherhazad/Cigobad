export class DeleteAttendeeOfASessionCommand {
  constructor(
    public readonly sessionId: number,
    public readonly userId: number,
  ) {}
}
