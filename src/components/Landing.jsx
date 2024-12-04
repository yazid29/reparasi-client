import Header from "./Header";
const Landing = () => {
  return (
    <div>
    <Header />
    <section className="bg-green-600 text-white text-center py-20">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-semibold mb-4">Perbaikan Perangkat Elektronik dan Aplikasi Profesional</h2>
            <p className="text-lg mb-6">Jasa reparasi yang cepat, berkualitas, dan terjangkau untuk semua perangkat Anda.</p>
            <a href="#contact" className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-md text-lg">Hubungi Kami Sekarang</a>
        </div>
    </section>
    <section id="services" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-10">Layanan Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Reparasi Perangkat Elektronik</h3>
                    <p>Kami menyediakan layanan perbaikan untuk berbagai perangkat elektronik seperti laptop, smartphone, dan perangkat lainnya.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Reparasi Aplikasi</h3>
                    <p>Memperbaiki masalah aplikasi dan software, baik di perangkat mobile maupun desktop, agar kembali berjalan dengan lancar.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Instalasi & Pemeliharaan</h3>
                    <p>Kami menyediakan layanan instalasi software serta pemeliharaan sistem perangkat Anda agar tetap optimal dalam bekerja.</p>
                </div>
            </div>
        </div>
    </section>
    <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-4">Tentang Kami</h2>
            <p className="text-lg max-w-3xl mx-auto">Kami adalah toko reparasi APL dengan pengalaman dalam memperbaiki berbagai perangkat elektronik dan aplikasi. Tim ahli kami siap memberikan solusi terbaik untuk kebutuhan reparasi Anda, dengan layanan yang cepat dan profesional.</p>
        </div>
    </section>
    <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p>&copy; 2024 Toko Reparasi APL.</p>
        </div>
    </footer>
    </div>
  )
}
export default Landing;
