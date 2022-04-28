type ColeccionOrdenada<T> = T[] | Set<T>;

interface Coleccion<T> {
	elementos: ColeccionOrdenada<T>;
	agregar: (e: T) => ColeccionOrdenada<T>;
	remover: (c: T) => ColeccionOrdenada<T>;
	vacio: () => boolean;
}

class Bolsa<T> implements Coleccion<T> {
	elementos: T[];

	constructor(prop?: T[]) {
		this.elementos = prop || [];
	}

	agregar(e: T) {
		this.elementos.push(e);
		return this.elementos;
	}

	remover(c: T) {
		const idx = this.elementos.findIndex((e) => c == e);
		if (idx >= 0) {
			this.elementos = [
				...this.elementos.slice(0, idx),
				...this.elementos.slice(idx + 1)
			];
		} else {
			console.log('El elemento no existe.');
		}
		return this.elementos;
	}

	vacio() {
		return !!this.elementos.length;
	}
}

class Conjunto<T> implements Coleccion<T> {
	elementos: Set<T>;

	constructor(prop?: Set<T>) {
		this.elementos = prop || new Set();
	}

	agregar(e: T) {
		this.elementos.add(e);
		return this.elementos;
	}

	remover(c: T) {
		if (this.elementos.has(c)) this.elementos.delete(c);
		else console.log('El elemento no existe.');
		return this.elementos;
	}

	vacio() {
		return !!this.elementos.size;
	}
}
