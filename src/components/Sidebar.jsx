const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <nav className="mt-6">
                <ul>
                    <li>
                        <a href="/app/users" className="block px-6 py-5 text-bold text-lg hover:bg-gray-700">User</a>
                    </li>
                    <li>
                        <a href="/app/tickets" className="block px-6 py-5 text-bold text-lg hover:bg-gray-700">Ticket</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Sidebar;