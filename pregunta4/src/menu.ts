import { Manejador, MenuOptions } from './models';

// This function is in charge of managing the user selected option to display
const menu = (opt: MenuOptions, manejador: Manejador) => {
	// Lectura de lo que ha provisto el usuario
	const splittedOpt = opt.split(' ');

	switch (splittedOpt[0]) {
		case MenuOptions.class:
			// validación de error
			if (
				splittedOpt.length < 3 ||
				(splittedOpt.length >= 4 &&
					splittedOpt[2] === ':' &&
					!splittedOpt[3])
			) {
				console.log(
					`El formato de ${MenuOptions.class} es CLASS <tipo> [<nombre>]`
				);
				break;
			}
			try {
				// Modo con super clase
				if (splittedOpt.length >= 5 && splittedOpt[2] === ':')
					manejador.class(
						splittedOpt[1],
						splittedOpt
							.slice(4)
							.filter((item) => item && item !== ' '),
						splittedOpt[3]
					);
				// Modo sin super clase
				else
					manejador.class(
						splittedOpt[1],
						splittedOpt
							.slice(2)
							.filter((item) => item && item !== ' ')
					);
				break;
			} catch (e) {
				if (e && (e as Error).message) {
					console.log((e as Error).message);
				} else {
					console.log(e);
				}
				break;
			}

		case MenuOptions.describir:
			// validación de error
			if (splittedOpt.length !== 2) {
				console.log(
					`El formato de ${MenuOptions.describir} es DESCRIBIR <nombre>`
				);
				break;
			}
			console.log(manejador.describir(splittedOpt[1]));
			break;

		default:
			console.log('Error, acción no valida');
			break;
	}
	console.log('Diga su siguiente acción:');
};

export default menu;
