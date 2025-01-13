export function CurrentUserMixin<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  @ObjectType({ isAbstract: true }) // Mark as abstract GraphQL type
  abstract class CurrentUser extends Base {
    @Field(() => Int) // GraphQL field
    userId: number;
  }
  return CurrentUser;
}