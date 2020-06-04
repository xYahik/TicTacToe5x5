export class Generate {
	static Menu(c: HTMLElement) {
		this.InputHeight(c);
		this.InputWidth(c);
		this.InputMarks(c);
		this.InputDeathZones(c);
		this.InputTime(c);
	}
	static InputHeight(c: HTMLElement) {
		let input: HTMLInputElement = document.createElement('input');
		input.id = 'height';
		input.type = 'number';
		input.value = '3';
		input.min = '3';
		input.max = '100';
		c.append('Wysokosc:');
		c.append(input);
		c.append(document.createElement('br'));
	}
	static InputWidth(c: HTMLElement) {
		let input: HTMLInputElement = document.createElement('input');
		input.id = 'width';
		input.type = 'number';
		input.value = '3';
		input.min = '3';
		input.max = '100';
		c.append('Szerokosc:');
		c.append(input);
		c.append(document.createElement('br'));
	}
	static InputMarks(c: HTMLElement) {
		let input: HTMLInputElement = document.createElement('input');
		input.id = 'checkrule';
		input.type = 'number';
		input.value = '3';
		input.min = '2';
		input.max = '10';
		c.append('Marks to Win:');
		c.append(input);
		c.append(document.createElement('br'));
	}
	static InputDeathZones(c: HTMLElement) {
		let input: HTMLInputElement = document.createElement('input');
		input.id = 'deathzone';
		input.type = 'number';
		input.value = '0';
		input.min = '0';
		input.max = '10';
		c.append('DeathZones:');
		c.append(input);
		c.append(' (Remember that game have to be winable)');
		c.append(document.createElement('br'));
	}
	static InputTime(c: HTMLElement) {
		let input: HTMLInputElement = document.createElement('input');
		input.id = 'time';
		input.type = 'number';
		input.value = '15';
		input.min = '5';
		input.max = '30';
		c.append('Time:');
		c.append(input);
		c.append(' [5-30]');
		c.append(document.createElement('br'));
	}
}
