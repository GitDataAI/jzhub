console.log("Hello via Bun!");

export interface AppWrite<T> {
  code: number,
  msg: string,
  data?: T,
}
