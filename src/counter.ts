import { html, render } from "lit-html"
import { CounterStore } from "./counter-store"

export type CounterState = {
  count: number
}

export class Counter {
  private _el: HTMLElement
  private _store: CounterStore
  private counterState: CounterState
  constructor(element: HTMLElement, store: CounterStore) {
    this._el = element
    this._store = store
    this.counterState = this.getCurrentState()

    this._render()
    this._store.addEventListener(this._store.rerenderKey, () => {
      this._render()
    })
  }

  getCurrentState(): CounterState {
    let currentState = this._store.getCounterState()
    return JSON.parse(currentState || `{"count": 0}`) as CounterState
  }

  increase() {
    this.counterState.count = this.counterState.count + 1
    this._store.setCounterState(JSON.stringify(this.counterState))
  }

  decrease() {
    this.counterState.count = this.counterState.count - 1
    this._store.setCounterState(JSON.stringify(this.counterState))
  }

  reset() {
    this._store.setCounterState(`{"count": 0}`)
  }

  private template(counterState: CounterState) {
    return html`<p class="hello">Hello ${JSON.stringify(counterState)}</p>
    <br>
    <a href="#" @click="${ () => this.increase() }">Increase</a>
    <br>
    <a href="#" @click="${ () => this.decrease() }">Decrease</a>`
  }

  _render() {
    return render(this.template(this.getCurrentState()), this._el)
  }
}