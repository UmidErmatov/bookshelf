import { LoaderFunctionArgs, createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import PublicPage from "../components/PublicPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import BooksPage from "../pages/Books";

async function loginLoader() {
    const key = localStorage.getItem("key")
    if (key) {
        return redirect("/books");
    }
    return null;
}

async function signUpLoader() {
    const key = localStorage.getItem("key")
    if (key) {
        return redirect("/books");
    }

    return null;
}

function protectedLoader({ request }: LoaderFunctionArgs) {
    const key = localStorage.getItem("key")

    if (!key) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/sign-up?" + params.toString());
    }
    return null;
}

export const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: PublicPage,
            },
            {
                path: "login",
                loader: loginLoader,
                Component: SignIn,
            },
            {
                path: "sign-up",
                loader: signUpLoader,
                Component: SignUp,
            },
            {
                path: "books",
                loader: protectedLoader,
                Component: BooksPage,
            },
        ],
    },
    {
        path: "/logout",
        async action() {
            return redirect("/");
        },
    },
]);