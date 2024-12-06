/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import { useUpdateUserMutation, useGetUserByIdQuery } from "@/api/usersApiSlice";
import React, { useEffect, useState } from 'react';
export function UpdateUserDrawer({ userId }) {
    const { data: user, isLoading, isError, error } = useGetUserByIdQuery(userId);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
            roles: '',
        },
    });

    // Ketika data pengguna berhasil diambil, reset form dengan data pengguna
    useEffect(() => {
        if (user) {
            reset({
                username: user.username || '',
                password: '',
                roles: user.roles[0] || '',
            });
        }
    }, [user, reset]);

    // Fungsi untuk menangani submit form
    const onSubmit = (data) => {
        console.log('Data user updated:', data);
    };
    return (
        <Sheet>
            <SheetTrigger
                className="inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
                <i className="fas fa-pencil-alt"></i>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>
                    <SheetDescription>Edit Data User ID: {userId}</SheetDescription>
                </SheetHeader>
                <form className="mt-4 space-y-4"
                // onSubmit={handleSubmit(onSubmit)}
                >
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
                            {...register('username', { required: 'Username is required' })}
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
                            <option value="">Pilih role</option>
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
                        Update
                    </button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
