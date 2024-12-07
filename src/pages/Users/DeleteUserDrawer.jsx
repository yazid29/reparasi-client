/* eslint-disable no-unused-vars */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDeleteUserMutation } from "@/api/usersApiSlice";
import {useState } from "react";
import { toast } from "sonner";
// eslint-disable-next-line react/prop-types
export function DeleteUserDrawer({ userId, username }) {
    const [deleteUser, { isLoading, isError, isSuccess, error }] = useDeleteUserMutation();
    
    const onDelete = async () => {
        console.log("delete user id",userId);
        try {
            await deleteUser({id:userId});
            toast.info("Successfully delete user");
        } catch (error) {
            console.error("Error deleting user:", error); 
        }
    };
    // State untuk mengontrol status dialog
    const [isOpen, setIsOpen] = useState(false);
    // Fungsi untuk membuka dialog
    const openDialog = () => setIsOpen(true);
    // Fungsi untuk menutup dialog
    const closeDialog = () => setIsOpen(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger 
                onClick={openDialog}
                className="ml-2 inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <i className="fas fa-trash"></i>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this User?
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <p className="col-span-4 text-center text-sm text-red-600">
                            Deleting <b>{username}</b>  will permanently remove account.
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <button
                        onClick={onDelete}
                        type="button"
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                        onClick={closeDialog}
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 ml-2"
                    >
                        Cancel
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}