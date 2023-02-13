export class HeaderOptions {
  constructor(
    public title: string,
    public iconClass: string,
    public callback: () => void,
    public subtitle?: string
  ) {}
}
