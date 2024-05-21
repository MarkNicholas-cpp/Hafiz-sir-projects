export interface MongooseError {
    code: number,
    errorResponse: {
        code: number,
        errmsg: string,
        errorResponse: {
            index: number,
            code: number,
            errmsg: string
        }
    }
}