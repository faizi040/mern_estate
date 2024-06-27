

//function to handle situations in which we want to throw error intentiolly like password length is too small

export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}