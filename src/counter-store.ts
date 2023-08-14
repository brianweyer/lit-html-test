import { LocalStorage } from "./local-storage"

export class CounterStore extends LocalStorage {

  constructor() {
    super("counter")
  }

  public getCounterState() {
    return this.get("counter-state")
  }

  public setCounterState(data: string) {
    this.set("counter-state", data)
    this.rerender()
  }
}