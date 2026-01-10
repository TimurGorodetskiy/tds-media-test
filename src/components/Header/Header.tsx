// libraries
import { Link, useLocation } from 'react-router-dom';
// components
import { Button } from "@/components/ui/button";
// icons
import { Users, UserPlus } from "lucide-react";

export const Header = () => {
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                        <Users className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:block">
                        TDS Media Panel
                    </span>
                </Link>

                <nav className="flex items-center gap-2">
                    <Button
                        asChild
                        variant={location.pathname === "/" ? "secondary" : "ghost"}
                        size="sm"
                        className="transition-all"
                    >
                        <Link to="/">
                            <Users className="h-4 w-4 mr-2" />
                            Список
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant={location.pathname === "/add" ? "secondary" : "ghost"}
                        size="sm"
                        className="transition-all"
                    >
                        <Link to="/add">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Добавить
                        </Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
};