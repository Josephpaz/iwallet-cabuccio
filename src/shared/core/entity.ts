export interface EntityMetadata {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export abstract class Entity<T> {
  protected readonly props: T;
  private readonly _id?: string;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;
  private _deletedAt?: Date | null;

  constructor(props: T, metadata?: EntityMetadata) {
    this.props = props;
    this._id = metadata?.id;
    this._createdAt = metadata?.createdAt;
    this._updatedAt = metadata?.updatedAt;
    this._deletedAt = metadata?.deletedAt;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get deletedAt() {
    return this._deletedAt ?? null;
  }

  set deletedAt(deletedAt: Date | null) {
    this._deletedAt = deletedAt;
  }
}
