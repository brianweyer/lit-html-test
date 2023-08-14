import { html, render } from "lit-html"
import { CounterState } from "./counter"
import { VotingStore } from "./voting-store"

export type VotingState = {
  votes: {
    [index: string]: number
  }
}

export class Voting {
  private _el: HTMLElement
  private _store: VotingStore
  private votingState: CounterState
  constructor(element: HTMLElement, store: VotingStore) {
    this._el = element
    this._store = store
    this.votingState = this.getCurrentState()

    this._render()
    this._store.addEventListener(this._store.rerenderKey, () => {
      this._render()
    })
  }

  getCurrentState(): CounterState {
    let votingState = this._store.getVotingState()
    return JSON.parse(votingState || `{"count": 0}`) as CounterState
  }

  increase() {
    this.votingState.count = this.votingState.count + 1
    this._store.setCounterState(JSON.stringify(this.votingState))
  }

  decrease() {
    this.votingState.count = this.votingState.count - 1
    this._store.setCounterState(JSON.stringify(this.votingState))
  }

  reset() {
    this._store.setCounterState(`{"count": 0}`)
  }

  private template(counterState: CounterState) {
    return html`<p>Hello ${JSON.stringify(counterState)}</p>
    <br>
    <a href="#" @click="${ () => this.increase() }">Increase</a>
    <br>
    <a href="#" @click="${ () => this.decrease() }">Decrease</a>`
  }

  _render() {
    return render(this.template(this.getCurrentState()), this._el)
  }
}