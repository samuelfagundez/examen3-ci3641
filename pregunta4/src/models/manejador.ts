// Manejador de tablas de métodos virtuales para un sistema
// orientado a objetos con herencia simple y despacho dinámico
// de métodos.
export class Manejador {
	classes: Record<string, { inheritance?: string; methods: string[] }> = {};

	/**
	 *
	 * @param name - class name
	 * @param methods - methods to add
	 * @param inheritance - inheritance class name
	 * @returns nothing
	 */
	class(name: string, methods: string[], inheritance?: string): void {
		/**
		 *
		 * @param valor - value to check
		 * @param indice - index to check
		 * @returns if it's the first time we read the element
		 */
		function isFirst(valor: string, indice: number) {
			return methods.indexOf(valor) === indice;
		}

		/** Class name must exist */
		if (this.classes[name]) {
			throw new Error(`La clase ${name} ya existe`);
		}
		/** If a super class is provided then it must exist */
		if (inheritance && !this.classes[inheritance]) {
			throw new Error(`La clase ${inheritance} no existe`);
		}
		/** Methods can't be empty */
		if (!methods.length) {
			throw new Error('Los métodos deben estar definidos');
		}
		/** Methods can't be repeated */
		if (!methods.every(isFirst)) {
			throw new Error('Los métodos deben ser únicos');
		}
		this.classes[name] = {
			inheritance,
			methods
		};
	}

	/**
	 *
	 * @param name - class name
	 * @returns
	 */
	describir(name: string): string {
		const readClass = this.classes[name];
		/** Class name must exist */
		if (!readClass) return `No existe la clase ${name}`;
		/** Set which contains the class methods */
		const classDescriptor: Set<string> = new Set();
		/** Set which contains the super class methods */
		const inheritanceClassDescriptor: Set<string> = new Set();
		readClass.methods.forEach((method) => {
			classDescriptor.add(method);
		});
		if (readClass.inheritance) {
			this.classes[readClass.inheritance].methods.forEach((method) => {
				/** If the method was overwritten then ignore it from the parent. */
				if (!classDescriptor.has(method))
					inheritanceClassDescriptor.add(method);
			});
		}
		/** Build the response message */
		const printClassDescriptor = [
			...[...classDescriptor].map((method) => ({ class: name, method })),
			...[...inheritanceClassDescriptor].map((method) => ({
				class: readClass.inheritance,
				method
			}))
		]
			.map(
				(descriptor) =>
					`${descriptor.method} -> ${descriptor.class} :: ${descriptor.method}\n`
			)
			.join('');
		return printClassDescriptor.slice(0, printClassDescriptor.length - 1);
	}
}
