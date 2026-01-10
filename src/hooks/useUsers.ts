// libraries
import {useEffect, useState} from "react";
import {toast} from "sonner";
// api
import {UserService} from "@/services/userService.ts";
// types
import type {User} from "@/types/user.ts";
// configs
import {ITEMS_PER_PAGE} from "@/components/UserList/config.ts";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: string, order: 'asc' | 'desc' }>(
        {key: 'id', order: 'asc'},
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const fetchUsers = async () => {
        setIsLoading(true);

        try {
            const data = await UserService.getAll(
                {page, limit: ITEMS_PER_PAGE, sortBy: sortConfig.key, orderBy: sortConfig.order},
            );
            setUsers(data);
        } catch {
            toast.error('Ошибка при загрузке списка пользователей')
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async (id: number | string) => {
        try {
            await UserService.delete(id);

            setUsers(prev => prev.filter(user => user.id !== id));
            toast.success('Пользователь успешно удален')
        } catch {
            toast.error('Ошибка при удалении пользователя')
        }
    }

    const requestSort = (key: string) => {
        let order: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }

        setSortConfig({key, order});
    }


    useEffect(() => {
        fetchUsers();
    }, [page, sortConfig]);

    return {users, isLoading, refetchUsers: fetchUsers, handleDelete, page, setPage, sortConfig, requestSort};
}