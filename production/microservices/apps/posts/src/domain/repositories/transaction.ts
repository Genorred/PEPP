export abstract class Transaction {
  abstract exec<T extends readonly Promise<any>[]>(
    arg: [...T],
  ): Promise<{ [K in keyof T]: Awaited<T[K]> }>;
}
