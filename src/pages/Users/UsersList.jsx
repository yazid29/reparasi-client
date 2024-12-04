/* eslint-disable no-unused-vars */
import { useGetAllUsersQuery } from "../../api/usersApiSlice";
import Header from "../../components/Header";
import User from "./User";

export const UsersList = () => {
  const {
    data: usersData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUsersQuery("usersList", {
    // pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let list;

  if (isLoading) {
    list = <div>LOADING...</div>;
  }

  if (isSuccess) {
    const { ids } = usersData;
    const tableBody =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    list = (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Daftar Users</h1>
              <p>Mengelola akses dan data karyawan</p>
            </div>
            {/* Sebuah Drawer create User */}
          </div>

          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
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
      </div>
    );
  }

  return list;
};
