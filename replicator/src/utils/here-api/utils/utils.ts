export * from "./url/uriBuilder";

export const sleep = (ms: number) => {
    return new Promise( resolve => setTimeout(resolve, ms) );
}