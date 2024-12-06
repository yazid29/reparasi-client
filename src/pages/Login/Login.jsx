/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/authApiSlice";
import { setCredentials } from "../../api/authSlice";
import { z } from "zod";
import { toast } from "sonner";
export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const LoginSchema = z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(1, "Password is required"),
    })
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ 
        resolver: 
        zodResolver(LoginSchema),
    });

    const [login, { isLoading, isSuccess }] = useLoginMutation();
    const onSubmit = async (payload) => {
        try {
            const { accessToken } = await login(payload).unwrap();
            console.log("accessToken in login.jsx",accessToken);
            toast.info("You are logged in");
            localStorage.setItem("userName", payload.username);
            dispatch(setCredentials({ accessToken }));
            navigate("/app/dashboard");
        } catch (error) {
            if (!error.status) {
                console.error("No server response");
            }
            toast.error("Login Failed");
        }
    };
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <p className="text-3xl font-semibold text-center text-gray-700">Reparasi APL</p>
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-5">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input type="username"
                            {...register("username", { required: true })}
                            id="username" name="username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Masukkan email" required />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password"
                            {...register("password", { required: true })}
                            id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Masukkan password" required />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}