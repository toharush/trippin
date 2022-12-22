import Communication from '../communication/communication';

export default interface Contact {
    phone?: Communication[];
    www?: Communication[];
    email?: Communication[];
    tollFree?: Communication[];
    fax?: Communication[];
}
