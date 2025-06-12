
import { ImFilePdf } from "react-icons/im";

interface NavbarProps {
    title?: string;
}

function Navbar({ title = "My App" }: NavbarProps) {
    return (
        <nav className="bg-black text-white px-6 py-4 border-b border-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <ImFilePdf className="text-2xl text-red-500" />
                    <h1 className="text-2xl font-bold tracking-tight hover:text-gray-300 transition-colors duration-200">
                        {title}
                    </h1>
                </div>
                <div className="flex items-center space-x-6">
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Merge PDFs</a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Split PDF</a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Compress</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;