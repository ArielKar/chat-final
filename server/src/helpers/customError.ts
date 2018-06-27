export default class CustomError extends Error {
    private status: Number;

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}