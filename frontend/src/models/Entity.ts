export interface Id<T> {
  value: T
}

export interface Entity<I, T> {
  id: Id<I>
  val: T
}

export const isEqId = <T>(a: Id<T>, b: Id<T>): boolean => a.value === b.value;
