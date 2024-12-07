import { Filter, Search } from "lucide-react";
import { useGetAllticketsQuery } from "../../api/ticketsApiSlice";
import { SyncLoader } from "react-spinners";
import Ticket from "./Ticket";
import {CreateTicketDrawer} from "./CreateTicketDrawer";
export const TicketsList = () => {
  const {
    data: ticketsData,
    isLoading,
    isSuccess
  } = useGetAllticketsQuery("ticketList");
  let list;
  if (isLoading) {
    list = (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <SyncLoader color="#4f46e5" size={30} />
      </div>
    );
  }
  if (isSuccess) {
    const { ids } = ticketsData;
    const tableBody =
      ids?.length && ids.map((ticketId) => <Ticket key={ticketId} ticketId={ticketId} />);
    console.log("tableBody",tableBody);
      
    list = (
      <div >
        <div className="overflow-hidden rounded-lg shadow-sm">
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">List Ticket</h1>
              <p>Manage ticket data</p>
            </div>
            {/* Sebuah Drawer create Ticket */}
            <CreateTicketDrawer />
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* search */}
                <div className="relative flex-1">
                  <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Cari Ticket"
                    className="w-full pl-10 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                {/* filter */}
                <div className="flex gap-4">
                  <div className="relative">
                    <select
                      name=""
                      id=""
                      className="py-2 pl-8 pr-10 border-gray-300 rounded-md appearance-none focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="false">New</option>
                      <option value="true">Completed</option>
                    </select>
                    <Filter className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-2 top-1/2" />
                  </div>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Ticket
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableBody}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return list;
};
