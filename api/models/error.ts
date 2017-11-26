export interface IError {
    errors: [{
        code: string;
        description: string;
    }];
}

class APIError {
    static returnError = (res, err) => {
        let error = {
            code: "",
            description: ""
        };

        let status = 400;

        if (err.message) {
            error.code = "InvalidRequest";
            error.description = err.message;
        } else {
            status = 500;
            error.code = err[0].code;
            error.description = err[0].description;
        }

        res.status(status).json({
            errors: [error]
        });
    }
}

export default APIError;