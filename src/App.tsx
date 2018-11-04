import * as React from 'react';
import './App.css';
import { Simulation } from './Simulation';

class App extends React.Component<{}, {nextAmount: number}> {
  private simulation: Simulation;
  private nextNumber: HTMLInputElement;

  constructor(props: {}) {
    super(props);
    this.state = {nextAmount: 1};
    this.onNext = this.onNext.bind(this);
    this.onRestart = this.onRestart.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  public render() {
    return (
      <main>
        <Simulation ref={simulation=>{this.simulation=simulation!;}} skipAmount={this.state.nextAmount}/>
        <nav>
          <button id="btn-restart" onClick={this.onRestart}>Restart</button>
          <button id="btn-next" onClick={this.onNext}>Next</button>
          <div>
            <label htmlFor="next-amount">Skip by: </label>
            <input ref={(input=>{this.nextNumber=input!;})} id="next-amount" type="number" min="0" value={this.state.nextAmount} onChange={this.onChangeNumber}/>
          </div>
        </nav>
      </main>
    );
  }

  private onRestart() {
    this.simulation.onRestart();
  }

  private onNext() {
    this.simulation.onNext();
  }

  private onChangeNumber() {
    this.setState({nextAmount: +this.nextNumber.value});
  }
}

export default App;
