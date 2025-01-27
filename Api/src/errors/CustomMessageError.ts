import { ZodError } from "zod";

export class CustomMessageError {
	constructor(private error: Error | ZodError) {}

	get message() {
		if (this.error instanceof ZodError) {
			const errorMessages = this.error.errors.map((err) => {
				return `Request validation failed: '${err.path.join('.')}' - ${err.message}`;
			});
			return errorMessages.join("\n");
		}

		return this.error.message;
	}
}
