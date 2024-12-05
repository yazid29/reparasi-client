import { useLocation } from 'react-router-dom';
const Header = () => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    return (
        <header className="bg-gray-900 text-white py-4">
            <div className="max-w-full mx-auto px-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Toko Reparasi APL</h1>
                    <p>Ahli Reparasi Perangkat Elektronik dan Aplikasi</p>
                </div>
                {isLandingPage && (
                    <nav>
                        <ul className="flex space-x-6">
                            <li><a href="#services" className="hover:underline">Layanan</a></li>
                            <li><a href="#about" className="hover:underline">Tentang Kami</a></li>
                            <li><a href="login" className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-600">Login</a></li>
                        </ul>
                    </nav>
                )} 
                {!isLandingPage && (
                    <nav>
                        <ul className="flex space-x-6">
                            {/* <li><a href="/app/users" className="hover:underline">User</a></li>
                            <li><a href="/app/tickets" className="hover:underline">Ticket</a></li> */}
                            <li><a href="/" className="bg-red-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-red-900">Logout</a></li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    )
};

export default Header;