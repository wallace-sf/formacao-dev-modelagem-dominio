import { Id } from "./Id";

export interface EntityProps {
  id?: string;
}

export abstract class Entity<TEntity, TProps extends EntityProps> {
  public readonly id: Id;
  public readonly props: TProps;

  constructor(props: TProps) {
    this.id = new Id(props.id);
    this.props = props;
    this.props.id = this.id.value;
  }

  public equals(entity: Entity<TEntity, TProps>): boolean {
    return this.id.equals(entity.id);
  }

  public diff(entity: Entity<TEntity, TProps>): boolean {
    return this.id.diff(entity.id);
  }

  public clone(props: TProps): TEntity {
    const entity = this.constructor as new (props: TProps) => TEntity;

    return new entity({ ...this.props, ...props });
  }
}
