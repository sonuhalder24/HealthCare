export class Appointment {
	status!: string;
	//patient_id!: string;
	//patientFirstName!: string;
	//patientLastName!: string;
	booking_id!:string;
	disease!: string;
	tentativeDate!: Date;
	priority!: string;
	patient_id!: string;
	//tentativedate!: string;
	//registeredTime: any;
	//bookingDate!: Date;
	bookingTime!: Date;
   

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
