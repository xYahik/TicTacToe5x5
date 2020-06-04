import { Generate } from './generateEle';
import { Cell, ScoreBoard } from './tttAddons';
import { Board } from './tic-tac-toe';
export class Check {
	static scores: Array<ScoreBoard> = new Array();

	static CheckWin(
		x: number,
		y: number,
		checkrule: number,
		isFirstPlayer: boolean,
		intervalId: number,
		sizeX: number,
		sizeY: number,
		gameTable: number[][]
	): boolean {
		let tmp: boolean = this.CheckTableIsFull(sizeX, sizeY, gameTable);

		console.log(this.CheckVertical(checkrule - 1, x, y, 0, gameTable, sizeX, sizeY));
		if (
			this.CheckVertical(checkrule - 1, x, y, 0, gameTable, sizeX, sizeY) ||
			this.CheckHorizontal(checkrule - 1, x, y, 0, gameTable, sizeX, sizeY) ||
			this.CheckCrossLeft(checkrule - 1, x, y, 0, gameTable, sizeX, sizeY) ||
			this.CheckCrossRight(checkrule - 1, x, y, 0, gameTable, sizeX, sizeY) ||
			tmp
		) {
			let winner: HTMLHeadingElement = document.createElement('h3');
			if (tmp) winner.innerHTML = 'Remis';
			else winner.innerHTML = isFirstPlayer ? 'Winner: Player2' : 'Winner: Player1';

			this.scores.push(new ScoreBoard(winner.innerHTML, Date.now()));
			document.getElementById('winner').appendChild(winner);
			let resetb: HTMLButtonElement = document.createElement('button');
			resetb.innerText = 'Reset';
			resetb.addEventListener('click', (e: Event) => this.ResetSettings(sizeX, sizeY, checkrule));
			document.getElementById('winner').appendChild(resetb);
			clearInterval(intervalId);
			let timerhtml: HTMLElement = document.getElementById('timer');

			timerhtml.innerHTML = '';
			return false;
		} else {
			return true;
		}
	}
	static ResetSettings(width: number, height: number, checkrule: number) {
		document.getElementById('winner').innerHTML = '';
		let content: HTMLElement = document.getElementById('content');
		content.innerHTML = '';
		Generate.Menu(content);

		let button: HTMLButtonElement = document.createElement('button');
		button.innerText = 'CreateBoard';
		button.id = 'makeboard';

		content.appendChild(button);

		let scoreslist: HTMLElement = document.getElementById('scores');
		let scoress: string = '';
		for (let i: number = 0; i < Check.scores.length; i++) {
			let d: Date = new Date(Check.scores[i].date);
			scoress += Check.scores[i].winner + ' ' + d + '<br>';
		}
		scoreslist.innerHTML = scoress;
		new Board();
	}
	static CheckVertical(
		left: number,
		x: number,
		y: number,
		right: number,
		gameTable: number[][],
		sizeX: number,
		sizeY: number
	): boolean {
		let list: Cell[] = new Array();

		//left

		for (let i: number = 1; i <= left; i++) {
			let data = {} as Cell;
			data.xc = x - 1 * i;
			data.yc = y;
			if (!(data.xc < 0 || data.yc < 0 || data.xc >= sizeX || data.yc >= sizeY)) list.push(data);
		}
		//right
		for (let i: number = 1; i <= right; i++) {
			let data = {} as Cell;
			data.xc = x + 1 * i;
			data.yc = y;

			if (!(data.xc < 0 || data.yc < 0 || data.xc >= sizeX || data.yc >= sizeY)) list.push(data);
		}
		let tt: boolean = true;
		if (list.length == left + right) {
			for (let i: number = 0; i < list.length; i++) {
				tt = tt && gameTable[list[i].xc][list[i].yc] == gameTable[x][y];
			}

			if (tt) return true;
		}
		if (left <= 0) return false;

		return this.CheckVertical(left - 1, x, y, right + 1, gameTable, sizeX, sizeY);
	}
	static CheckHorizontal(
		left: number,
		x: number,
		y: number,
		right: number,
		gameTable: number[][],
		sizeX: number,
		sizeY: number
	): boolean {
		let list: Cell[] = new Array();
		//left
		for (let i: number = 1; i <= left; i++) {
			let data = {} as Cell;
			data.xc = x;
			data.yc = y - 1 * i;
			if (!(data.xc < 0 || data.yc < 0 || (data.xc >= sizeX && data.yc >= sizeY))) list.push(data);
		}
		//right
		for (let i: number = 1; i <= right; i++) {
			let data = {} as Cell;
			data.xc = x;
			data.yc = y + 1 * i;
			if (!(data.xc < 0 || data.yc < 0 || (data.xc >= sizeX && data.yc >= sizeY))) list.push(data);
		}
		let tt: boolean = true;
		if (list.length == left + right) {
			for (let i: number = 0; i < list.length; i++) {
				tt = tt && gameTable[list[i].xc][list[i].yc] == gameTable[x][y];
			}

			if (tt) return true;
		}
		if (left <= 0) return false;

		return this.CheckHorizontal(left - 1, x, y, right + 1, gameTable, sizeX, sizeY);
	}
	static CheckCrossLeft(
		left: number,
		x: number,
		y: number,
		right: number,
		gameTable: number[][],
		sizeX: number,
		sizeY: number
	): boolean {
		let list: Cell[] = new Array();
		//left
		for (let i: number = 1; i <= left; i++) {
			let data = {} as Cell;
			data.xc = x + 1 * i;
			data.yc = y - 1 * i;
			if (!(data.xc < 0 || data.yc < 0 || data.xc >= sizeX || data.yc >= sizeY)) list.push(data);
		}
		//right
		for (let i: number = 1; i <= right; i++) {
			let data = {} as Cell;
			data.xc = x - 1 * i;
			data.yc = y + 1 * i;
			if (!(data.xc < 0 || data.yc < 0 || data.xc >= sizeX || data.yc >= sizeY)) list.push(data);
		}
		let tt: boolean = true;
		if (list.length == left + right) {
			for (let i: number = 0; i < list.length; i++) {
				tt = tt && gameTable[list[i].xc][list[i].yc] == gameTable[x][y];
			}

			if (tt) return true;
		}
		if (left <= 0) return false;

		return this.CheckCrossLeft(left - 1, x, y, right + 1, gameTable, sizeX, sizeY);
	}
	static CheckCrossRight(
		left: number,
		x: number,
		y: number,
		right: number,
		gameTable: number[][],
		sizeX: number,
		sizeY: number
	): boolean {
		let list: Cell[] = new Array();
		//left
		for (let i: number = 1; i <= left; i++) {
			let data = {} as Cell;
			data.xc = x + 1 * i;
			data.yc = y + 1 * i;
			if (!(data.xc < 0 || data.yc < 0 || data.xc >= sizeX || data.yc >= sizeY)) list.push(data);
		}
		//right
		for (let i: number = 1; i <= right; i++) {
			let data = {} as Cell;
			data.xc = x - 1 * i;
			data.yc = y - 1 * i;
			if (!(data.xc < 0 || data.yc < 0 || data.xc >= sizeX || data.yc >= sizeY)) list.push(data);
		}
		let tt: boolean = true;
		if (list.length == left + right) {
			for (let i: number = 0; i < list.length; i++) {
				tt = tt && gameTable[list[i].xc][list[i].yc] == gameTable[x][y];
			}

			if (tt) return true;
		}
		if (left <= 0) return false;

		return this.CheckCrossRight(left - 1, x, y, right + 1, gameTable, sizeX, sizeY);
	}
	static CheckTableIsFull(sizeX: number, sizeY: number, gameTable: number[][]) {
		let tmp: boolean = true;
		for (let i: number = 0; i < sizeY; i++) {
			for (let j: number = 0; j < sizeX; j++) {
				console.log(i + ' ' + j + ' ' + gameTable[i][j]);
				if (gameTable[i][j] == 0) tmp = false;
			}
		}
		return tmp;
	}
}
