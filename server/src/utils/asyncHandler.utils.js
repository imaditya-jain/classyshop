const AsyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error(`Async handler error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}`);

        const errorMessage = error?.message || 'Internal Server Error';
        const errorCode = error?.statusCode || error?.code || 500;

        res.status(errorCode).json({
            success: false,
            message: errorMessage
        });
    }
};

export default AsyncHandler;
