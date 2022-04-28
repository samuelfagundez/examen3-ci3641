const grafo = [[1, 5], [2], [3], [4], [], [4]];

interface Grafo {
	lista_de_nodos: number[][];
}

class Busqueda implements Grafo {
	lista_de_nodos: number[][];
	orden: 'dfs' | 'bfs' = 'dfs';

	constructor(lista_de_nodos: number[][], orden?: 'dfs' | 'bfs') {
		this.lista_de_nodos = lista_de_nodos;
		this.orden = orden || 'dfs';
	}

	buscar(D: number, H: number): number {
		if (!(Number.isInteger(D) && Number.isInteger(H))) {
			console.log('Ambos parametros deben ser números enteros.');
			return -1;
		} else {
			let visited: boolean[] = this.lista_de_nodos.map((_) => false);
			visited[D] = true;
			let s: number[] = [D];
			let found = false;
			let nodosExplorados = 0;
			while (s.length > 0 && !found) {
				let nextNode: number;
				if (this.orden === 'dfs') {
					nextNode = s.pop() as number;
				} else {
					nextNode = s.shift() as number;
				}
				for (let adjV of this.lista_de_nodos[nextNode]) {
					nodosExplorados++;
					if (adjV === H) {
						found = true;
						break;
					}
					if (!visited[adjV]) {
						visited[adjV] = true;
						s.push(adjV);
					}
				}
			}
			return nodosExplorados;
		}
	}
}

// Ejemplo de uso
const BFS = new Busqueda(grafo, 'bfs');
const DFS = new Busqueda(grafo, 'dfs');
