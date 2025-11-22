export class Credentials {
     userId!: string;
     //username!: string;
     token!: string;
     //isLoggedIn!: string;
     


    

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
