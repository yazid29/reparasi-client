/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Switch } from "@headlessui/react";
import { useGetAllticketsQuery } from "../../api/ticketsApiSlice";
import { memo } from "react";
import { UpdateTicketDrawer } from "./UpdateTicketDrawer";
import { DeleteTicketDrawer } from "./DeleteTicketDrawer";

const Ticket = ({ ticketId, buttonRef, onStatusChange }) => {
  const { ticketD } = useGetAllticketsQuery("ticketList", {
    selectFromResult: ({ data }) => ({
      ticketD: data?.entities[ticketId],
    }),
  });
  
  console.log("ticketData",ticketD);
  const { title, desc, user, username , ticket} = ticketD;
  // const ticketRolesString = roles.toString().replaceAll(",", ", ");

  return (
    <tr key={ticketId}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">{title}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">{desc}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">{username}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">{ticket}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
        {/* Edit User Drawer */}
        <UpdateTicketDrawer ticketId={ticketId} />
        <DeleteTicketDrawer ticketId={ticketId} title={title}/>
      </td>
    </tr>
  );
};

const MemoizedUser = memo(Ticket);

export default MemoizedUser;
