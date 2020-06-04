export class Cell {
	xc: number;
	yc: number;
}
export class ScoreBoard {
	winner: string;
	date: number;
	constructor(par1: string, par2: number) {
		this.winner = par1;
		this.date = par2;
	}
}
export class Addons {
	static getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	static shuffle(a: Array<Cell>) {
		let j: number, x: Cell, i: number;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
}
