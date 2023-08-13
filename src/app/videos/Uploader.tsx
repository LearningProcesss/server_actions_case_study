import UploaderFormClient from "./UploaderFormClient";
import fsPromises from 'fs/promises';

export default async function Uploader() {
    async function upload(formData: FormData) {
        'use server'
        console.log(formData);
        const id = crypto.randomUUID();
        const nome: string = formData.get('nome') as string;
        const file: File = formData.get('documents') as File;

        // const fileData = await file.arrayBuffer();

        // const normalized = nome.replace(" ", "_")
        //     .replace("(", "_")
        //     .replace(")", "_")

        // await fsPromises.appendFile(`./public/${id}_${normalized}`, Buffer.from(fileData));

    }

    return (
        <div>
            <UploaderFormClient upload={upload} />
        </div>
    )
}