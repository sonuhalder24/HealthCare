export class Users {
   /* userId!: number;
    username!: string;
    mobile!: string;
    email!: string;
    location!: string;*/

    userId!: string;
  user_name!: string;   // must match backend JSON
  user_email!: string;
  user_mobile!: string;
  location!: string;

    constructor() {
        this.userId = '';
        this.user_name = 'user1';
        this.user_mobile = '1234567890';
        this.user_email = 'hdipa@gmail.com';
        this.location = 'kolkata';
    }

}

