'use client'
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";

export default function UploaderFormClient({ upload }: { upload: Function }) {
    const [file, setFile] = useState<File>();
    const [formData, setFormData] = useState<FormData>();

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);

            const formData = new FormData();

            formData.append('sourceFile', e.target.files[0]);

            formData.append('nome', e.target.files[0].name);

            setFormData(formData)
        }
    };

    return (
        <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box">
            <div className="flex justify-center w-full mx-auto sm:max-w-lg">
                <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                    <div className="mt-10 mb-10 text-center">
                        <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                        <p className="text-xs text-gray-500">File should be of format .mp4, .avi, .mov or .mkv</p>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        startTransition(() => {
                            upload(formData)
                        })
                    }} className="relative w-4/5 h-32 max-w-xs mb-10 bg-white bg-gray-100 rounded-lg shadow-inner">
                        <input type="file" id="file" className="hidden" onChange={handleFileChange} />
                        <label htmlFor="file" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                            <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                            <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                            </svg>
                        </label>
                        <label>
                            {file?.name}
                        </label>
                        <input type='submit' />
                    </form>
                </div>
            </div>
        </div>
    )

}