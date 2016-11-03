// Generate error responses in a standard format
function* error(code, message) {
	this.response = {
		status: code,
		body: message
	}
};

// 200 OK empty response
function* ok(response) {
	this.status = 200;
};

export default {ok, error};

