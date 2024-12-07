/* eslint-disable no-unused-vars */
import { useGetAllUsersQuery } from "../../api/usersApiSlice";
import { CreateUserDrawer } from "./CreateUserDrawer";
import User from "./User";
import { SyncLoader } from "react-spinners";

export const UsersList = () => {
  const {
    data: usersData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUsersQuery("usersList");

  let list;

  if (isLoading) {
    list = (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <SyncLoader color="#4f46e5" size={30} />
      </div>
    );
  }

  if (isSuccess) {
    const { ids } = usersData;
    const tableBody =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);
    console.log("tableBody User",tableBody);
    list = (
      <div >
        {/* <h2 className="text-3xl font-semibold">Welcome to the Dashboard</h2>
            <p className="mt-4 text-lg">This is an example of a page with a sidebar.</p>
          </div>
          <div className="max-w-7xl mx-auto px-6 py-6"> */}
        <div className="overflow-hidden rounded-lg shadow-sm">
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">List Users</h1>
              <p>Managing employee access and data</p>
            </div>
            {/* Sebuah Drawer create User */}
            <CreateUserDrawer />
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
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
    );
  }

  return list;
};
