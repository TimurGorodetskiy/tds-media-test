// libraries
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {toast} from "sonner";
// components
import { UserService } from "@/services/userService.ts";
import { UserForm } from "@/components/UserForm/UserForm.tsx";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// types
import type { UserFormData } from "@/features/users/schemas/UserSchema.ts";

export const CreateUserPage = () => {
    const navigate = useNavigate();

    const handleCreateUser = async (formData: UserFormData) => {
        try {
            const payload = {
                ...formData,
                skills: formData.skills.map(skill => skill.value),
            };

            await UserService.createNewUser(payload);
            toast.success("Пользователь успешно создан");
            navigate("/");
        } catch {
           toast.error('Ошибка создания пользователя');
        }
    };

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
                    <h1 className="text-3xl font-bold tracking-tight">Создание профиля</h1>
                    <p className="text-muted-foreground">
                        Заполните данные для регистрации нового пользователя в системе.
                    </p>
                </div>
            </div>

            <Separator className="my-6" />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <UserForm onSubmit={handleCreateUser} isLoading={false} />
            </div>
        </div>
    );
};