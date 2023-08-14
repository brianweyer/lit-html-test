import './style.styl'

import { html, render } from "lit-html";
import { CounterStore as CounterStore } from "./counter-store";
import { VotingStore } from "./voting-store";
import { AppStore } from './app-store';
import { Counter } from './counter';
import { Voting } from './voting';

type AppState = {
  currentView: View
}

enum View {
  primary = "primary",
  secondary = "secondary"
}

class App {
  private _el: HTMLElement
  private _state: AppState
  private _store: AppStore
  private _voting?: Voting
  private _counter?: Counter

  constructor(el: HTMLElement, store: AppStore) {
    this._store = store
    this._state = {} as AppState
    this._el = el
    
    this._render()
    this._store.addEventListener(this._store.rerenderKey, () => {
      this._render()
    })
    
    const _counter = this._el.querySelector<HTMLElement>("#counter")
    const _voting = this._el.querySelector<HTMLElement>("#voting")
    
    if (_counter) {
      const counterStore = new CounterStore()
      this._counter = new Counter(_counter, counterStore)
    }

    if (_voting) {
      const votingStore = new VotingStore()
      this._voting = new Voting(_voting, votingStore)
    }
    this._render()
  }

  getCurrentState() {

    this._state = JSON.parse(this._store.getCurrentView() || `{"currentView": "primary"}`) as AppState
    return this._state
  }

  setView(view: View) {
    this._store.setCurrentView(`{"currentView": "${view}"}`)
  }

  template(state: AppState) {
    return html`<p class="hello">Hello ${JSON.stringify(state)}</p>
    <br>
    <a href="#" @click="${ () => this._voting?.reset() }">Reset Primary</a>
    <a href="#" @click="${ () => this._counter?.reset() }">Reset Secondary</a>
    <br>
    <a href="#" class="${state.currentView === View.primary ? 'active': ''}" @click="${ () => this.setView(View.primary) }">Primary</a>
    <a href="#" class="${state.currentView === View.secondary ? 'active': ''}" @click="${ () => this.setView(View.secondary) }">Secondary</a>
    <div id="counter"></div>
    <div id="voting"></div>
    `
  }

  showView(view: View) {
    if (view === View.primary) {
      const counter = this._el.querySelector<HTMLElement>("#counter")
      if (counter) {
        counter.style.display = "none"
      }
      const voting = this._el.querySelector<HTMLElement>("#voting")
      if (voting) {
        voting.style.display = "block"
      }
    }
    if (view === View.secondary) {
      const counter = this._el.querySelector<HTMLElement>("#counter")
      if (counter) {
        counter.style.display = "block"
      }
      const voting = this._el.querySelector<HTMLElement>("#voting")
      if (voting) {
        voting.style.display = "none"
      }
    }
  }

  _render() {
    const currentState = this.getCurrentState()
    render(this.template(currentState), this._el)
    this.showView(currentState.currentView)
    if (this._counter) {
      this._counter._render()
    }
    if (this._voting) {
      this._voting._render()
    }
  }
}

const _app = document.querySelector<HTMLElement>('#app')

if (_app) {
  const appStore = new AppStore()
  new App(_app, appStore)
}
