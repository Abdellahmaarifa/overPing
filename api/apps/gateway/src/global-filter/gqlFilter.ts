import { HttpStatus } from '@nestjs/common';

export const formatError = (err) => {
    const { message, extensions, originalError } = err;
    const { code } = extensions;
  

    const formattedError = {
      statusCode:  extensions.status 
        || extensions.originalError?.statusCode 
        ||  extensions.originalError?.statusCode 
        || HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      error: extensions.originalError?.error,
      message: message,
      path: err.path,
    };
    
    return formattedError;
  };
  