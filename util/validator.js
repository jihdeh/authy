import validator from "validator";

export default function* (next) {
	for(let value in this.request.body) {
		this.request.body[value] = validator.escape(this.request.body[value]);
	}
	yield next;
}
