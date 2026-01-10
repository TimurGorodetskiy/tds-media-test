// libraries
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "sonner";
// componenst
import {UserForm} from "@/components/UserForm/UserForm.tsx";
import {Spinner} from "@/components/Spinner/Spinner.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";

// types
import type {User} from "@/types/user.ts";
// api
import {UserService} from "@/services/userService.ts";
// validation
import type {UserFormData} from "@/features/users/schemas/UserSchema.ts";
// icons
import {ChevronLeft} from "lucide-react";

export const EditUserPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    useEffect(() => {
        const loadUser = async () => {
            if (!id) {
                return;
            }

            try {
                setIsLoading(true);
                const data = await UserService.getUserById(id);
                setUser(data)

            } catch {
                toast.error('Ошибка загрузки пользователя');
            } finally {
                setIsLoading(false);
            }
        }
        loadUser();
    }, [id])


    const handleUpdate = async (formData: UserFormData) => {
        if (!id) {
            return;
        }

        try {
            setIsUpdating(true);

            const payload = {
                ...formData,
                skills:formData.skills.map(skill => skill.value),
            }
            await UserService.updateUserData(id, payload);
            toast.success('Информация о пользователе успешно обновлена')
            navigate("/");
        } catch {
            toast.error('Ошибка при обновлении информации о пользователе')
        } finally {
            setIsUpdating(false);
        }
    }

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <div className="container max-w-2xl mx-auto py-10 px-4 space-y-6">
            <div className="flex flex-col gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit -ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => navigate("/")}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    К списку пользователей
                </Button>

                <div className="space-y-0.5">
                    <h1 className="text-3xl font-bold tracking-tight">Изменение пользователя</h1>
                    <p className="text-muted-foreground">
                        Измените данные для пользователя.
                    </p>
                </div>
            </div>

            <Separator className="my-6" />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <UserForm initialData={user} onSubmit={handleUpdate} isLoading={isUpdating} />
            </div>
        </div>
    )

}