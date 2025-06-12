import React, { useState, useCallback, useRef } from "react";
import { IoIosDocument } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { PDFDocument } from 'pdf-lib';

interface FileWithPreview {
    id: string;
    name: string;
    file: File;
}

interface FileAdderProps {
    selectedOption: string | null;
}

function FileAdder({ selectedOption }: FileAdderProps) {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_FILES = 10;

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => setError(null), 3000);
    };

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (file) => file.type === "application/pdf"
        );

        if (files.length + droppedFiles.length > MAX_FILES) {
            showError(`You can only add up to ${MAX_FILES} files`);
            return;
        }

        const newFiles = droppedFiles.map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            file: file
        }));

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }, [files]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []).filter(
            (file) => file.type === "application/pdf"
        );

        if (files.length + selectedFiles.length > MAX_FILES) {
            showError(`You can only add up to ${MAX_FILES} files`);
            return;
        }

        const newFiles = selectedFiles.map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            file: file
        }));

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (id: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    };

    const getDropText = () => {
        switch (selectedOption) {
            case "merge-pdf":
                return "Drag and drop your PDFs to merge them";
            case "split-pdf":
                return "Drag and drop your PDF to split it";
            case "compress-pdf":
                return "Drag and drop your PDF to compress it";
            case "convert-pdf":
                return "Drag and drop your files to convert them to PDF";
            default:
                return "Select a PDF operation above";
        }
    };

    const mergePDFs = async (pdfFiles: FileWithPreview[]) => {
        try {
            setIsProcessing(true);
            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of pdfFiles) {
                const fileArrayBuffer = await pdfFile.file.arrayBuffer();
                const pdf = await PDFDocument.load(fileArrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            }

            const mergedPdfFile = await mergedPdf.save();
            const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            // Create a download link
            const link = document.createElement('a');
            link.href = url;
            link.download = 'merged.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            console.log("PDFs merged successfully!");
        } catch (error) {
            console.error("Error merging PDFs:", error);
            showError("Error merging PDFs. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleContinue = async () => {
        if (!selectedOption) {
            showError("Please select a PDF operation first");
            return;
        }

        const fileNames = files.map(file => file.name);

        switch (selectedOption) {
            case "merge-pdf":
                if (files.length < 2) {
                    showError("Please add at least 2 PDFs to merge");
                    return;
                }
                console.log("Merging PDFs:", fileNames);
                await mergePDFs(files);
                break;
            case "split-pdf":
                if (files.length > 1) {
                    showError("Split operation only accepts one PDF file");
                    return;
                }
                console.log("Splitting PDF:", fileNames[0]);
                break;
            case "compress-pdf":
                if (files.length > 1) {
                    showError("Compress operation only accepts one PDF file");
                    return;
                }
                console.log("Compressing PDF:", fileNames[0]);
                break;
            case "convert-pdf":
                console.log("Converting files to PDF:", fileNames);
                break;
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white px-8 pt-2 pb-8 rounded-lg shadow-lg w-[800px]">
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${isDragging ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-red-400"
                        }`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        id="fileInput"
                        className="hidden"
                        multiple
                        accept=".pdf"
                        onChange={handleFileInput}
                    />
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer inline-block"
                    >
                        <div className="text-gray-600 mb-4">
                            <p className="text-lg font-medium">{getDropText()}</p>
                            <p className="text-sm mt-2">or</p>
                            <button
                                type="button"
                                className="mt-4 px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors duration-200"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Browse Files
                            </button>
                            <p className="text-sm mt-2 text-gray-500">
                                Maximum {MAX_FILES} files
                            </p>
                        </div>
                    </label>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {files.length > 0 && (
                    <>
                        <div className="mt-4 space-y-2">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-200 transition-colors duration-200"
                                >
                                    <div className="flex items-center space-x-3">
                                        <IoIosDocument className="text-red-400 text-xl" />
                                        <span className="text-gray-700 font-medium">{file.name}</span>
                                    </div>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="text-red-400 hover:text-red-500 flex items-center space-x-1"
                                    >
                                        <IoClose className="text-xl" />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleContinue}
                                disabled={isProcessing}
                                className={`flex items-center space-x-2 px-6 py-3 bg-red-400 text-white rounded-lg transition-colors duration-200 font-medium ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'
                                    }`}
                            >
                                <span>{isProcessing ? 'Processing...' : 'Continue'}</span>
                                {!isProcessing && <IoIosArrowForward className="text-xl" />}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FileAdder;


