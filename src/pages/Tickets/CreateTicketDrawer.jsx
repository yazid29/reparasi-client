/* eslint-disable no-unused-vars */
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
import { useCreateTicketMutation, useGetAllticketsQuery, useGetAllUsersTicketQuery} from "@/api/ticketsApiSlice";
import { toast } from "sonner";
export function CreateTicketDrawer() {
  const { data: tickets, refetch, isLoading: isUsersLoading, isError: isUsersError } = useGetAllticketsQuery();
  // buatkan untuk getAllUsersTicket
  const { data: allUsersTicket, isLoading: isAllUsersLoading, isError: isAllUsersError } = useGetAllUsersTicketQuery();
  // console.log("allUsersTicket", allUsersTicket);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(ticketSchema) });

  const [createTicket, { isLoading, isError, isSuccess, error }] =
    useCreateTicketMutation();

  const onSubmit = async (payload) => {
    console.log("payload", payload);
    // try {
    //   await createTicket({
    //     title: payload.title,
    //     desc: payload.desc,
    //     user: payload.user,
    //   });

    //   reset();
    //   toast.info("Successfully updated Ticket");
    //   refetch();
    // } catch (error) {
    //   console.error("failed to create Ticket", error);
    // }
  };

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Ticket
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Ticket</SheetTitle>
          <SheetDescription>Insert Ticket Information</SheetDescription>
        </SheetHeader>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* username */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* desc */}
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
              {...register("desc", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.desc && (
              <p className="mt-1 text-sm text-red-600">
                {errors.desc.message}
              </p>
            )}
          </div>

          {/* roles */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="user"
            >
              User
            </label>
            <select
              id="user"
              {...register("user")}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Pilih User</option>
              {Object.values(allUsersTicket).map((role) => (
                <option key={role.id} value={role.id}>
                  {role.username}
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
