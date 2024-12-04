import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"
import Landing from "./components/Landing"
import { UsersList } from "./pages/Users/UsersList"
import { TicketList } from "./pages/Tikets/TicketsList"
export default function App() {
  return (
    <Routes>
      {/* path = "/" -> root URL */}
      <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="app" element={<Layout />}>
            <Route index element={<Navigate to="/app/users" />} />
            <Route path="users" element={<UsersList />} />
            <Route path="tickets" element={<TicketList />} />
          </Route>
      </Route>
    </Routes>
  )
}
