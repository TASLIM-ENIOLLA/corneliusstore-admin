export default class Validate {
	constructor(name, value) {
		if(typeof value === undefined) {
			throw new Error(`'${name}' has a value of 'undefined'`)
		}

		this.formFieldName = name;
		this.formFieldValue = value;

		this[name] = value;

		return this;
	}

	min = (count: number = 0): Validate => {
		if(this.formFieldValue.length < count) {
			throw new Error(`'${this.formFieldName}' has ${this.formFieldValue.length} characters, which is less than ${count}`);
		}

		return this;
	}

	max = (count: number = 0): Validate => {
		if(this.formFieldValue.length > count) {
			throw new Error(`'${this.formFieldName}' has ${this.formFieldValue.length} characters, which is greater than ${count}`);
		}
	}

	integer = (): Validate => {
		if(!/\d+/.test(this.formFieldValue)) {
			throw new Error(`'${this.formFieldName}' is not an integer`);
		}

		return this;
	}

	currency = (): Validate => {
		if(!/[\d\.\,]/.test(this.formFieldValue)) {
			throw new Error(`'${this.formFieldName}' is not a floating number`);
		}

		return this;
	}

	url = (): Validate => {
		if(!/^(ftp|http|https):\/\/[^ "]+$/.test(this.formFieldValue)) {
			throw new Error(`'${this.formFieldName}' is not a valid URL`);
		}

		return this;
	}
}
