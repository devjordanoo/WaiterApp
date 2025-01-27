export default class BaseController {
	constructor() {
		this.bindAllMethods();
	}

	private bindAllMethods(): void {
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this)) as (keyof this)[];

		methods.forEach((method) => {
			if (method !== 'constructor' && typeof this[method] === 'function') {
				this[method] = (this[method] as any).bind(this);
			}
		});
	}
}
