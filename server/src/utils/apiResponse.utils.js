class ApiResponse {
    constructor(success, message, data, statusCode) {
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}

export default ApiResponse;