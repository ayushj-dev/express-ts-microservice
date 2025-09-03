declare module 'express-serve-static-core' {
  interface Request {
    data?: any;
  }
}

/* This empty export is required in order for the ts compiler to know that this is a module
 * since we are declaring a module and we want the file to behave like a ts module
 *
 * NOTE: DO NOT REMOVE THIS! OR ENTIRE APP WILL BREAK!
 * */
export { }
