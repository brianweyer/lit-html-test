export class LocalStorage extends EventTarget {
  private _window = window
  private _storeKey: string
  public rerenderKey: string
  
  constructor(storeKey: string) {
    super()
    this._storeKey = storeKey
    this.rerenderKey = `${storeKey}.rerender`
    // window.addEventListener("storage", () => {
    //   this.rerender()
    // })
  }

  public getStoreName() {
    return this._storeKey
  }

  public get(key: string): string | null {
    return this._window.localStorage.getItem(`${this._storeKey}.${key}`)
  }

  public remove(key: string) {
      this._window.localStorage.removeItem(`${this._storeKey}.${key}`)
  }

  public clearAll() {
    this._window.localStorage.clear()
  }

  public set(key: string, value: string) {
    this._window.localStorage.setItem(`${this._storeKey}.${key}`, value)
    setTimeout(() => {
      
    }, 1000);
  }

  public rerender() {
    console.log(`sending rerender for store (${this._storeKey})`)
    this.dispatchEvent(new CustomEvent(this.rerenderKey))
  }
}