import { LocalStorage } from "./local-storage"

export class VotingStore extends LocalStorage {

  constructor() {
    super("voting")
  }

  public getVotingState() {
    return this.get("voting-state")
  }

  public setCounterState(data: string) {
    this.set("voting-state", data)
    this.rerender()
  }
}