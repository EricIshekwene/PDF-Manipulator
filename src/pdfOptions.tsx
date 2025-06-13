interface PdfOptionsProps {
    selectedOption: string | null;
    onOptionChange: (option: string) => void;
}

function PdfOptions({ selectedOption, onOptionChange }: PdfOptionsProps) {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white px-8 pt-8 pb-2 rounded-lg shadow-lg w-[800px]">
                <ul className="flex flex-wrap gap-4 justify-center">
                    <li className="services__item">
                        <input
                            name="pdfFunction"
                            id="merge-pdf"
                            type="radio"
                            className="services__input hidden"
                            checked={selectedOption === "merge-pdf"}
                            onChange={() => onOptionChange("merge-pdf")}
                        />
                        <label
                            htmlFor="merge-pdf"
                            className={`block p-4 rounded-lg cursor-pointer transition-colors duration-200 font-medium ${selectedOption === "merge-pdf"
                                ? "bg-red-400 text-white hover:bg-red-500"
                                : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                                }`}
                        >
                            Merge PDFs
                        </label>
                    </li>
                    <li className="services__item">
                        <input
                            name="pdfFunction"
                            id="split-pdf"
                            type="radio"
                            className="services__input hidden"
                            checked={selectedOption === "split-pdf"}
                            onChange={() => onOptionChange("split-pdf")}
                        />
                        <label
                            htmlFor="split-pdf"
                            className={`block p-4 rounded-lg cursor-pointer transition-colors duration-200 font-medium ${selectedOption === "split-pdf"
                                ? "bg-red-400 text-white hover:bg-red-500"
                                : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                                }`}
                        >
                            Split PDF
                        </label>
                    </li>
                    <li className="services__item">
                        <input
                            name="pdfFunction"
                            id="compress-pdf"
                            type="radio"
                            className="services__input hidden"
                            checked={selectedOption === "compress-pdf"}
                            onChange={() => onOptionChange("compress-pdf")}
                        />
                        <label
                            htmlFor="compress-pdf"
                            className={`block p-4 rounded-lg cursor-pointer transition-colors duration-200 font-medium ${selectedOption === "compress-pdf"
                                ? "bg-red-400 text-white hover:bg-red-500"
                                : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                                }`}
                        >
                            Compress PDF
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PdfOptions;  