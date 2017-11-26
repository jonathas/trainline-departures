export interface IError {
    errors: [{
        code: string;
        description: string;
    }];
}

export const formatError = (code: string, message: string): IError => {
    return {
        errors: [{
            code: code,
            description: message
        }]
    };
};