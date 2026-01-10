import apiClient from "../api/client.ts";
import type {CreateUserPayload, User} from '../types/user.ts';


export const UserService = {
    async getAll(params: { page: number; limit: number; sortBy: string; orderBy: "asc" | "desc"; }): Promise<User[]> {
        const {data} = await apiClient.get<User[]>('/users', {
            params: {
                page: params.page,
                limit: params.limit,
                sortBy: params.sortBy,
                order: params.orderBy,
            }
        });

        return data
    },

    async getUserById(id: string): Promise<User> {
        const {data} = await apiClient.get<User>(`/users/${id}`);

        return data
    },

    async createNewUser(user: CreateUserPayload): Promise<User> {
        const {data} = await apiClient.post<User>('/users', {
            ...user,
            registrationDate: new Date().toISOString(),
        });

        return data
    },

    async updateUserData(id: string, user: Partial<CreateUserPayload>): Promise<User> {
        const {data} = await apiClient.put<User>(`/users/${id}`, user);

        return data
    },


    async delete(id: string | number): Promise<void> {
        await apiClient.delete(`users/${id}`);
    }
}