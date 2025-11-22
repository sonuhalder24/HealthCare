export class Patient {
    patient_Id!: string;
    
    firstName!: string;
    lastName!: string;
    //patient_name!: string;
    gender!: string;
    dob!: string;
    //mobile!: number;
    patient_mobile!: string;
    //email!: string;
    patient_email!: string;
    description?: string;
    //registeredTime!: Date;
    registeredDate!: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}