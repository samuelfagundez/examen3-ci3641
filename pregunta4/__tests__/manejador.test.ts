import { Manejador } from '../src/models';

describe('Manejador module', () => {
	it('<Describir> error case', () => {
		const manejador = new Manejador();
		expect(manejador.describir('A')).toBe('No existe la clase A');
	});

	it('<Describir> success case [2]', () => {
		const manejador = new Manejador();
		manejador.class('A', ['f', 'g']);
		expect(manejador.describir('A')).toBe('f -> A :: f\ng -> A :: g');
	});

	it('<Describir> success case [3]', () => {
		const manejador = new Manejador();
		manejador.class('A', ['f']);
		expect(manejador.describir('A')).toBe('f -> A :: f');
	});

	it('<Describir> success case [3]', () => {
		const manejador = new Manejador();
		manejador.class('A', ['f', 'g']);
		manejador.class('B', ['f', 'h'], 'A');
		expect(manejador.describir('B')).toBe(
			'f -> B :: f\nh -> B :: h\ng -> A :: g'
		);
	});

	it('<Class> error case [1]', () => {
		const manejador = new Manejador();
		manejador.class('A', ['f', 'g']);
		try {
			manejador.class('A', ['f', 'g']);
		} catch (err) {
			expect((err as Error).message).toBe('La clase A ya existe');
		}
	});

	it('<Class> error case [2]', () => {
		const manejador = new Manejador();
		try {
			manejador.class('A', ['f', 'g'], 'B');
		} catch (err) {
			expect((err as Error).message).toBe('La clase B no existe');
		}
	});

	it('<Class> error case [3]', () => {
		const manejador = new Manejador();
		try {
			manejador.class('A', []);
		} catch (err) {
			expect((err as Error).message).toBe(
				'Los métodos deben estar definidos'
			);
		}
	});

	it('<Class> error case [4]', () => {
		const manejador = new Manejador();
		manejador.class('A', ['f', 'g']);
		try {
			manejador.class('B', [], 'A');
		} catch (err) {
			expect((err as Error).message).toBe(
				'Los métodos deben estar definidos'
			);
		}
	});

	it('<Class> error case [5]', () => {
		const manejador = new Manejador();
		try {
			manejador.class('A', ['f', 'g', 'f']);
		} catch (err) {
			expect((err as Error).message).toBe('Los métodos deben ser únicos');
		}
	});

	it('<Class> error case [6]', () => {
		const manejador = new Manejador();
		manejador.class('A', ['f', 'g']);
		try {
			manejador.class('B', ['h', 'g', 'h'], 'A');
		} catch (err) {
			expect((err as Error).message).toBe('Los métodos deben ser únicos');
		}
	});

	it('<Class> error case [7]', () => {
		const manejador = new Manejador();
		try {
			manejador.class('A', ['f', 'g'], 'A');
		} catch (err) {
			expect((err as Error).message).toBe('La clase A no existe');
		}
	});

	it('<Class> success', () => {
		const manejador = new Manejador();
		manejador.class('A', ['f', 'g']);
		manejador.class('B', ['h', 'g'], 'A');
		expect(manejador.classes).toStrictEqual({
			A: {
				inheritance: undefined,
				methods: ['f', 'g']
			},
			B: {
				inheritance: 'A',
				methods: ['h', 'g']
			}
		});
	});

	it('Complete use case', () => {
		const manejador = new Manejador();
		manejador.class('A', ['f', 'g']);
		manejador.class('B', ['f', 'h'], 'A');
		expect(manejador.describir('B')).toBe(
			'f -> B :: f\nh -> B :: h\ng -> A :: g'
		);
		expect(manejador.describir('A')).toBe('f -> A :: f\ng -> A :: g');
		manejador.class('HOJA', ['tallo', 'color', 'venas']);
		manejador.class('HOJA_CANADIENSE', ['color', 'forma'], 'HOJA');
		expect(manejador.describir('HOJA_CANADIENSE')).toBe(
			'color -> HOJA_CANADIENSE :: color\nforma -> HOJA_CANADIENSE :: forma\ntallo -> HOJA :: tallo\nvenas -> HOJA :: venas'
		);
		expect(manejador.describir('HOJA')).toBe(
			'tallo -> HOJA :: tallo\ncolor -> HOJA :: color\nvenas -> HOJA :: venas'
		);
	});
});
