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
import React, { useEffect, useState, useRef } from 'react';
import { toast } from "sonner";
export function UpdateUserDrawer({ userId, onCloseDrawer }) {
    const { data: user, isLoading, isError, error, refetch } = useGetUserByIdQuery(userId);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
            roles: '',
        },
    });
    const [updateUser, { isUpdate, isErrorUpdate, isSuccessUpdate, errorUpdate }] = useUpdateUserMutation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // Membuat referensi untuk drawer
    const drawerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Jika klik di luar drawer, tutup drawer
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsDrawerOpen(false);
            }
        };

        // Menambahkan event listener ketika drawer dibuka
        if (isDrawerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Hapus event listener saat drawer ditutup atau komponen unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDrawerOpen]);
    // Ketika data pengguna berhasil diambil, reset form dengan data pengguna
    useEffect(() => {
        if (isDrawerOpen && user) {
            // Reset form dengan nilai terbaru dari user yang di-fetch
            reset({
                id: user.id || '',
                username: user.username || '',
                // password: '',
                roles: user.roles[0] || '',
                active: user.active,
            });
        }
    }, [isDrawerOpen, user, reset]);
    // Fungsi untuk menangani submit form
    const onSubmit = async (payload) => {
        console.log('Data user updated:', payload);
        try {
            await updateUser({
                id: payload.id,
                username: payload.username,
                // password: payload.password,
                roles: [payload.roles],
                active: payload.active
            }).unwrap();
            setIsDrawerOpen(false);
            toast.info("Successfully Create User");
            // refetch();
            reset();
            // onCloseDrawer();
        } catch (error) {
            console.error("Failed to update user", errorUpdate);
        }
    };
    return (
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetTrigger
                onClick={() => { setIsDrawerOpen(!isDrawerOpen); }} 
                className="inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
                <i className="fas fa-pencil-alt"></i>
            </SheetTrigger>
            <SheetContent ref={drawerRef} >
                <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>
                    <SheetDescription>Edit Data User ID: {userId}</SheetDescription>
                </SheetHeader>
                <form className="mt-4 space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <input type="text" id="id" name="id" value=""
                            {...register('id')} hidden />
                    </div>
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
                    {/* <div>
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
                    </div> */}
                    {/* active */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="active"
                        >
                            Status
                        </label>
                        <select
                            id="active"
                            {...register("active")}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Status Account</option>
                            <option key="true" value="true">Active</option>
                            <option key="false" value="false">Inactive</option>
                        </select>
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
