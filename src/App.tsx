// libraries
import {Routes, Route} from 'react-router-dom';
// components
import {UserList} from "./components/UserList/UserList.tsx";
import {CreateUserPage} from "./pages/CreateUserPage/CreateUserPage.tsx";
import {EditUserPage} from "./pages/EditUserPage/EditUserPage.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {Header} from "@/components/Header/Header.tsx";

function App() {

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header/>

            <main className="flex-grow container mx-auto py-8 px-4">
                <Routes>
                    <Route path="/" element={<UserList/>}/>
                    <Route path="/add" element={<CreateUserPage/>}/>
                    <Route path="/edit/:id" element={<EditUserPage/>}/>
                </Routes>
            </main>

            <footer className="py-6 text-center text-sm text-muted-foreground border-t bg-white">
                © 2026 Timur Gorodetskiy.
            </footer>
            <Toaster position='top-right' richColors closeButton/>
        </div>
    );
}

export default App;