import {Loader2} from "lucide-react";

export const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4 min-h-[400px]">
            <Loader2 className="h-10 w-10 animate-spin text-primary"/>
            <p className="text-muted-foreground font-medium animate-pulse">
                Подготовка данных...
            </p>
        </div>
    )
}