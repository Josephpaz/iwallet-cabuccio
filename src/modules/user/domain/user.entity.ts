import { Entity, EntityMetadata } from 'src/shared/core/entity';
import { hashSync } from 'bcrypt';

export type UserProps = {
  name: string;
  balance: number;
  email: string;
  password: string;
};

export class User extends Entity<UserProps> {
  constructor(props: UserProps, metadata?: EntityMetadata) {
    super(props, metadata);
  }

  static create(props: UserProps, metadata?: EntityMetadata) {
    return new User(props, metadata);
  }

  get name() {
    return this.props.name;
  }

  get balance() {
    return this.props.balance;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = hashSync(password, 10);
  }
}
