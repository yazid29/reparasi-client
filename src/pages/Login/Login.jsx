import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from "../../api/authApiSlice";
import { setCredentials } from "../../api/authSlice";
import { z } from "zod";
import { toast } from "sonner";
export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const location = useLocation();

    const LoginSchema = z.object({
        username: z.string().min(8, "Minimum 8 Karakter"),
        password: z.string().min(5, "Minimum 5 Karakter"),
    })
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        // eslint-disable-next-line no-unused-vars
        reset,
    } = useForm({ resolver: zodResolver(LoginSchema) });

    // eslint-disable-next-line no-unused-vars
    const [login, { isLoading, isSuccess }] = useLoginMutation();
    const onSubmit = async (payload) => {
        try {
            const { accessToken } = await login(payload).unwrap();
            toast.info("You are logged in");
            dispatch(setCredentials({ accessToken }));
            navigate("/app");
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
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <a href="app/users" className="text-blue-500 text-sm hover:underline">By Pass Login... </a>
                </div>
            </div>
        </div>
    )
}