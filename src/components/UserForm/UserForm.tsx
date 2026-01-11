// libraries
import {useEffect} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
// components
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
// types
import type {User} from "@/types/user.ts";
// validation
import {type UserFormData, userSchema} from "@/features/users/schemas/UserSchema.ts";
// icons
import {Plus, Trash2, Save, UserPlus} from "lucide-react";

interface UserFormProps {
    initialData?: User;
    onSubmit: (data: UserFormData) => void;
    isLoading: boolean;
}

export const UserForm = ({initialData, onSubmit, isLoading}: UserFormProps) => {
    const {register, reset, control, handleSubmit, formState: {errors}} = useForm<UserFormData>({
        mode: "onBlur",
        resolver: zodResolver(userSchema),
        defaultValues: initialData
            ? {...initialData, skills: initialData.skills.map(skill => ({value: skill}))}
            : {skills: [{value: ''}]}
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'skills'
    });

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                skills: initialData.skills.map(skill => ({value: skill}))
            });
        }
    }, [initialData, reset]);

    return (
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    {initialData ? "Редактирование профиля" : "Новый пользователь"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Имя</Label>
                            <Input
                                id="firstName"
                                {...register('firstName')}
                                className={errors.firstName ? "border-red-500" : ""}
                            />
                            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Фамилия</Label>
                            <Input
                                id="lastName"
                                {...register('lastName')}
                                className={errors.lastName ? "border-red-500" : ""}
                            />
                            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-4">
                        <Label className="text-base font-semibold">Навыки</Label>
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start">
                                    <div className="flex-1 space-y-1">
                                        <Input
                                            {...register(`skills.${index}.value`)}
                                            placeholder="Например: React"
                                            className={errors.skills?.[index]?.value ? "border-red-500" : ""}
                                        />
                                        {errors.skills?.[index]?.value && (
                                            <p className="text-xs text-red-500">Навык не может быть пустым</p>
                                        )}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                            {errors.skills?.root?.message ? (
                                <p className="text-sm font-medium text-red-500">{errors.skills.root.message}</p>
                            ) : (
                                errors.skills?.message && (
                                    <p className="text-sm font-medium text-red-500">{errors.skills.message}</p>
                                )
                            )}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full mt-2 border-dashed"
                            onClick={() => append({value: ''})}
                        >
                            <Plus className="h-4 w-4 mr-2"/> Добавить навык
                        </Button>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            "Загрузка..."
                        ) : initialData ? (
                            <><Save className="h-4 w-4 mr-2"/> Сохранить изменения</>
                        ) : (
                            <><UserPlus className="h-4 w-4 mr-2"/> Создать пользователя</>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};