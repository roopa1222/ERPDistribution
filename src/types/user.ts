export interface IUser {
    branchId: number,
    name: string;
    email: string,
    password: string;
    userName: string;
    role: string;
    id: number;
}

export enum IRoles {
    SALESMAN = 'SALESMAN',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
  }