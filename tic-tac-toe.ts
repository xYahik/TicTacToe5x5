import { Generate } from './generateEle';
import { Check } from './rules';
import { Cell, Addons } from './tttAddons';
import './style.scss';
//let scores:ScoreBoard[];

export class Board {
	sizeX: number;
	sizeY: number;
	gameTable: number[][];
	isFirstPlayer: boolean = true;
	checkrule: number = 3;
	deathZoneCount: number = 0;
	playable: boolean = false;
	time: number = 150;
	deathzones: Array<Cell> = new Array();
	deathzonescounter = 3;
	constructor() {
		let button = document.getElementById('makeboard');

		button.addEventListener('click', (e: Event) => this.createBoard());
	}
	createBoard() {
		let width = parseInt((<HTMLInputElement>document.getElementById('width')).value);
		let height = parseInt((<HTMLInputElement>document.getElementById('height')).value);
		let checkrule = parseInt((<HTMLInputElement>document.getElementById('checkrule')).value);
		let deathZoneCount = parseInt((<HTMLInputElement>document.getElementById('deathzone')).value);
		let time = parseInt((<HTMLInputElement>document.getElementById('time')).value);
		this.sizeX = width;
		this.sizeY = height;
		this.checkrule = checkrule;
		this.gameTable = [];
		this.playable = true;
		this.time = time * 10;
		this.counter = this.time;
		this.deathZoneCount = deathZoneCount;

		for (let i: number = 0; i < height; i++) {
			this.gameTable[i] = [];

			for (let j: number = 0; j < width; j++) {
				this.gameTable[i][j] = 0;
			}
		}
		for (let i: number = 0; i < this.deathZoneCount; i++) {
			let x: number = Addons.getRandomInt(0, this.sizeX - 1);
			let y: number = Addons.getRandomInt(0, this.sizeX - 1);
			let c: Cell = new Cell();
			c.xc = x;
			c.yc = y;
			this.deathzones.push(c);
			this.gameTable[x][y] = -1;
		}
		document.getElementById('content').innerHTML = '';
		document.getElementById('scores').innerHTML = '';
		document.getElementById('content').appendChild(this.buildTable(this.gameTable, this.sizeX, this.sizeY));
		this.start();
	}
	ResetSettings() {
		this.isFirstPlayer = true;
		document.getElementById('winner').innerHTML = '';
		let content: HTMLElement = document.getElementById('content');
		content.innerHTML = '';

		Generate.Menu(content);

		let button: HTMLButtonElement = document.createElement('button');
		button.innerText = 'CreateBoard';
		button.id = 'makeboard';
		button.addEventListener('click', (e: Event) => this.createBoard());
		content.appendChild(button);
		let scoreslist: HTMLElement = document.getElementById('scores');
		let scoress: string = '';
		for (let i: number = 0; i < Check.scores.length; i++) {
			let d: Date = new Date(Check.scores[i].date);
			scoress += Check.scores[i].winner + ' ' + d + '<br>';
		}
		scoreslist.innerHTML = scoress;
	}
	MinusDeathZone() {
		if (this.deathzones.length > 0) {
			this.deathzonescounter--;
			if (this.deathzonescounter <= 0) {
				Addons.shuffle(this.deathzones);
				this.gameTable[this.deathzones[0].xc][this.deathzones[0].yc] = 0;
				let td: HTMLElement = document.getElementById(
					'c' + this.deathzones[0].xc + '-' + this.deathzones[0].yc
				);
				td.removeAttribute('style');
				this.deathzones.shift();
				this.deathzonescounter = 3;
			}
		}
	}

	SetCell(x: number, y: number) {
		if (this.playable) {
			let a = document.getElementById('c' + x + '-' + y);
			if (this.gameTable[x][y] == 0) {
				if (this.isFirstPlayer) {
					this.gameTable[x][y] = 1;
					a.innerHTML = 'X';
					a.style.color = 'red';
					this.isFirstPlayer = false;
					this.MinusDeathZone();
				} else {
					this.gameTable[x][y] = 2;
					a.innerHTML = 'O';

					a.style.color = 'blue';
					this.isFirstPlayer = true;
					this.MinusDeathZone();
				}
				this.reset();
			}

			this.playable = Check.CheckWin(
				x,
				y,
				this.checkrule,
				this.isFirstPlayer,
				this.intervalId,
				this.sizeX,
				this.sizeY,
				this.gameTable
			);
		}
	}
	buildTable(data: number[][], width: number, height: number) {
		let table: HTMLTableElement = document.createElement('table');
		table.className = 'gridtable';
		let tbody: HTMLTableSectionElement = document.createElement('tbody');
		for (let i: number = 0; i < height; i++) {
			let tr: HTMLTableRowElement = document.createElement('tr');
			for (let j: number = 0; j < width; j++) {
				let td: HTMLTableDataCellElement = document.createElement('td');
				if (this.gameTable[i][j] == -1) {
					td.setAttribute('style', 'background:black;');
				}
				td.className = 'cell';
				td.id = 'c' + i + '-' + j;
				td.addEventListener('click', (e: Event) => this.SetCell(i, j));
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		return table;
	}
	counter: number = 150;
	intervalId: number = 0;
	start() {
		clearInterval(this.intervalId);
		this.intervalId = 0;
		this.intervalId = <any>setInterval(() => {
			this.counter = this.counter - 1;
			let timerhtml: HTMLElement = document.getElementById('timer');
			let test: string = this.isFirstPlayer ? ' Player1' : ' Player2';
			timerhtml.innerHTML = Math.floor(this.counter / 10) + ':' + this.counter % 10 + test; //+" " + (this.isFirstPlayer)?"Player2":"Player1";
			if (this.counter <= 0) {
				clearInterval(this.intervalId);

				if (this.isFirstPlayer) this.isFirstPlayer = false;
				else this.isFirstPlayer = true;
				this.reset();
			}
		}, 100);
	}
	reset() {
		clearInterval(this.intervalId);
		this.counter = this.time;

		this.start();
	}
}
window.onload = function() {
	new Board();
};
