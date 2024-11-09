export interface IUser {
    branchId: number,
    firstName: string;
    lastName:string
    email: string,
    mobileNo:string;
    password: string;
    userName: string;
    role: string;
}

export enum IRoles {
    SALESMAN = 'SALESMAN',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
  }