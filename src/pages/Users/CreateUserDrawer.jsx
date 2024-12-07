/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schema/User";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROLES } from "@/config/roles";
import { useCreateUserMutation, useGetAllUsersQuery } from "@/api/usersApiSlice";
import { toast } from "sonner";
export function CreateUserDrawer() {
  const { data: users, refetch, isLoading: isUsersLoading, isError: isUsersError } = useGetAllUsersQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(userSchema) });

  const [createUser, { isLoading, isError, isSuccess, error }] =
    useCreateUserMutation();

  const onSubmit = async (payload) => {
    try {
      await createUser({
        username: payload.username,
        password: payload.password,
        roles: [payload.roles],
      });

      reset();
      toast.info("Successfully updated user");
      refetch();
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add User
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New User</SheetTitle>
          <SheetDescription>Insert user Information</SheetDescription>
        </SheetHeader>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* username */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* pwd */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* roles */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="roles"
            >
              Roles
            </label>
            <select
              id="roles"
              {...register("roles")}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Pilih rol</option>
              {Object.values(ROLES).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
