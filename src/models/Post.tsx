export default class Post {
    constructor(
        private _id: number,
        private _title: string,
        private _body: string,
        private _userId: number
    ) {}

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get body(): string {
        return this._body;
    }

    get userId(): number {
        return this._userId;
    }
}