export interface User{
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    skills: string[];
    registrationDate: string;
}

export type CreateUserPayload = Omit<User, 'id' | 'registrationDate'>