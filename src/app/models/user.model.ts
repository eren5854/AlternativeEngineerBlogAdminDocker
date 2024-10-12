export class UserModel{
    id?: string;
    fullName: string = "";
    firstName?: string;
    lastName?:string;
    userName: string = "";
    email: string = "";
    password?: string;
    profilePicture: any;
    phoneNumber?: string;
    about?:string;
    role?: any;
    gender?:number;
    emailConfirmed?:boolean;
    dateOfBirth:any;
    createdDate:any;
    lastLogin:any;
}

export class UserRoleModel{
    name?:string;
    value?: number;
}