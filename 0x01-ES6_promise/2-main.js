import handleResponseFromAPI from './2-then';

const promise = Promise.resolve();
handleResponseFromAPI(promise);

const pr = Promise.reject();
handleResponseFromAPI(pr);
