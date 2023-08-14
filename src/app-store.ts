import { LocalStorage } from "./local-storage"

enum StoreKey {
  currentView = "current-view"
}

export class AppStore extends LocalStorage {

  constructor() {
    super("app")
  }

  public getCurrentView() {
    return this.get(StoreKey.currentView)
  }

  public setCurrentView(data: string) {
    this.set(StoreKey.currentView, data)
    this.rerender()
  }
}