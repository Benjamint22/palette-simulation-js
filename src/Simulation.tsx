import * as React from 'react';
import { Game } from './classes/Game';

export class Simulation extends React.Component<{skipAmount: number}> {
    private canvas = React.createRef<HTMLCanvasElement>();
    private game: Game;

    public onNext() {
        for (let i = 0; i < Math.max(0, this.props.skipAmount); i++) {
            this.game.generateLastSnapshot();
        }
        
        this.game.redraw();
    }

    public onRestart() {
        this.updateCanvas();
    }

    public render() {
        return (<canvas ref={this.canvas}/>);
    }

    public componentDidMount() {
        this.updateCanvas();
    }
    
    private updateCanvas() {
        const canvas = this.canvas.current!;
        this.game = new Game(canvas);
        this.game.redraw();
    }
}