export abstract class BaseEntity implements Entity{
  private _id: string | null = null;
  public get id() {
    return this._id ?? crypto.randomUUID();
  }
}

export type Entity = {
  id: string;
}


