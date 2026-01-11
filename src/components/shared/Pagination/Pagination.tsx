// components
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
// configs
import {PAGINATION_CONFIG} from "@/components/shared/Pagination/config.ts";
// icons
import {ChevronLeft, ChevronRight} from "lucide-react";

interface PaginationProps {
    page: number;
    limit: number;
    totalItems: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
}

export const Pagination = ({page, limit, totalItems, setPage, setLimit}: PaginationProps) => {
    const isFarFromStart = page > 2;
    const hasMorePotentialPages = totalItems === limit;

    return (
        <div
            className="flex items-center justify-between mt-6 px-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Строк на странице:</span>
                <Select
                    value={String(limit)}
                    onValueChange={(value) => {
                        setLimit(Number(value));
                        setPage(1);
                    }}
                >
                    <SelectTrigger className="h-8 w-[70px] cursor-pointer">
                        <SelectValue placeholder={limit}/>
                    </SelectTrigger>
                    <SelectContent>
                        {PAGINATION_CONFIG.LIMIT_OPTIONS.map((value) => (
                            <SelectItem key={value} value={String(value)} className="cursor-pointer">
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    <ChevronLeft className="h-4 w-4"/>
                </Button>

                <div className="flex items-center gap-1">
                    {isFarFromStart && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setPage(1)}
                            >
                                1
                            </Button>
                            <span className="text-muted-foreground text-xs px-1">...</span>
                        </>
                    )}

                    {[-1, 0, 1].map((offset) => {
                        const neighborPage = page + offset;

                        const isPageValid = neighborPage >= 1;
                        if (!isPageValid) {
                            return null;
                        }

                        const isLastPageReached = offset === 1 && totalItems < limit;
                        if (isLastPageReached) {
                            return null;
                        }

                        return (
                            <Button
                                key={neighborPage}
                                variant={neighborPage === page ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 p-0 cursor-pointer"
                                onClick={() => setPage(neighborPage)}
                            >
                                {neighborPage}
                            </Button>
                        );
                    })}

                    {hasMorePotentialPages && (
                        <>
                            <span className="text-muted-foreground text-xs px-1">...</span>
                        </>
                    )}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    disabled={totalItems < limit}
                    onClick={() => setPage(page + 1)}
                >
                    <ChevronRight className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    );
};