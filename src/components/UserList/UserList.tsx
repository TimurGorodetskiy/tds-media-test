// libraries
import {useNavigate} from "react-router-dom";
// components
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Spinner} from "@/components/Spinner/Spinner.tsx";
//hooks
import {useUsers} from "@/hooks/useUsers.ts";
// icons
import {
    Trash2,
    Pencil,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronDown,
    ChevronsUpDown
} from 'lucide-react';
import {ITEMS_PER_PAGE} from "@/components/UserList/config.ts";


export const UserList = () => {
    const navigate = useNavigate();
    const {users, isLoading, handleDelete, sortConfig, requestSort, setPage, page} = useUsers();

    const getSortIcon = (key: string) => {
        if (sortConfig.key !== key) return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50"/>;
        return sortConfig.order === 'asc'
            ? <ChevronUp className="ml-2 h-4 w-4 text-primary"/>
            : <ChevronDown className="ml-2 h-4 w-4 text-primary"/>;
    };

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    return (
        <div className="rounded-md border p-4 shadow-sm bg-white">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-16'>ID</TableHead>
                        {['firstName', 'lastName', 'email'].map((field) => (
                            <TableHead
                                key={field}
                                className="cursor-pointer hover:text-primary transition-colors"
                                onClick={() => requestSort(field)}
                            >
                                <div className="flex items-center">
                                    {field === 'firstName' && 'Имя'}
                                    {field === 'lastName' && 'Фамилия'}
                                    {field === 'email' && 'Email'}
                                    {getSortIcon(field)}
                                </div>
                            </TableHead>
                        ))}
                        <TableHead>Дата регистрации</TableHead>
                        <TableHead>Навыки</TableHead>
                        <TableHead className='text-right'>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <TableCell className="font-mono text-[10px] text-muted-foreground italic">
                                {user.id}
                            </TableCell>
                            <TableCell className="font-medium">{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {new Date(user.registrationDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1 max-w-[200px]">
                                    {user.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-[10px] px-1.5 py-0">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 px-2 border-blue-200 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                                        onClick={() => navigate(`/edit/${user.id}`)}
                                    >
                                        <Pencil className="h-3.5 w-3.5 mr-1.5"/>
                                        Изменить
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="h-8 px-2 cursor-pointer hover:bg-red-500"
                                            >
                                                <Trash2 className="h-3.5 w-3.5 mr-1.5"/>
                                                Удалить
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Это действие нельзя отменить. Пользователь
                                                    <span
                                                        className="font-semibold text-foreground"> {user.firstName} {user.lastName} </span>
                                                    будет навсегда удален из базы данных.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-red-500 hover:bg-red-600"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Удалить
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-6 px-2">
                <p className="text-sm text-muted-foreground font-medium">
                    Страница <span className="text-foreground">{page}</span>
                </p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                        className="h-8"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1"/>
                        Назад
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={users.length < ITEMS_PER_PAGE}
                        onClick={() => setPage(prev => prev + 1)}
                        className="h-8"
                    >
                        Вперед
                        <ChevronRight className="h-4 w-4 ml-1"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};