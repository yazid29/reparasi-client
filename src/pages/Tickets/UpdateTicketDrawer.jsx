/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "../../schema/Ticket";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ROLES } from "@/config/roles";
import { useUpdateTicketMutation, useGetTicketByIdQuery } from "@/api/ticketsApiSlice";
import React, { useEffect, useState, useRef } from 'react';
import { toast } from "sonner";
export function UpdateTicketDrawer({ ticketId, onCloseDrawer }) {
    const { data: ticket, isLoading, isError, error, refetch } = useGetTicketByIdQuery(ticketId);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
            roles: '',
        },
    });
    const [updateUser, { isUpdate, isErrorUpdate, isSuccessUpdate, errorUpdate }] = useUpdateTicketMutation();
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
        if (isDrawerOpen && ticket) {
            // Reset form dengan nilai terbaru dari user yang di-fetch
            reset({
                id: ticket._id || '',
                title: ticket.title || '',
                desc: ticket.desc || '',
                username: ticket.username || '',
                ticket: ticket.ticket || '',
                user: ticket.user || '',
                isFixed: ticket.isFixed? true : false
            });
        }
    }, [isDrawerOpen, ticket, reset]);
    // Fungsi untuk menangani submit form
    const onSubmit = async (payload) => {
        console.log('Data Ticket updated:', payload);
        try {
            await updateUser({
                id: payload.id,
                title: payload.title,
                desc: payload.desc,
                user: payload.user,
                ticket: payload.ticket,
                isFixed: payload.isFixed
            }).unwrap();
            setIsDrawerOpen(false);
            toast.info("Successfully Create Ticket");
            // refetch();
            reset();
            // onCloseDrawer();
        } catch (error) {
            console.error("Failed to update Ticket", errorUpdate);
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
                    <SheetDescription>Edit Data User ID: {ticketId}</SheetDescription>
                </SheetHeader>
                <form className="mt-4 space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <input type="text" id="id" name="id" value=""
                            {...register('id')} hidden />
                    </div>
                    <div>
                        <input type="text" id="user" name="user" value=""
                            {...register('user')} hidden />
                    </div>
                    {/* title */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="username"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register('title', { required: 'Username is required' })}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    {/* description */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="desc"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            id="desc"
                            {...register('desc', { required: 'description is required' })}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.desc && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.desc.message}
                            </p>
                        )}
                    </div>
                    {/* ticket */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="ticket"
                        >
                            Ticket
                        </label>
                        <input
                            type="text"
                            id="ticket"
                            {...register('ticket', { required: 'description is required' })}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.ticket && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.ticket.message}
                            </p>
                        )}
                    </div>
                    {/* isFixed */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="isFixed"
                        >
                            Status
                        </label>
                        <select
                            id="isFixed"
                            {...register("isFixed")}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Status Ticket</option>
                            <option key="true" value="true">Fixed</option>
                            <option key="false" value="false">Not Fixed</option>
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
