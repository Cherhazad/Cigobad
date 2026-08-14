export class EmailQuery {
  constructor(
    public readonly email: string,
    public readonly token: string,
  ) {}
}
