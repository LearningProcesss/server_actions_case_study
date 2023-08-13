'use server'
import { revalidatePath } from 'next/cache';
import PocketBase from 'pocketbase';
import fsPromises from 'fs/promises';
import { exec, spawn } from 'child_process'
import crypto from 'crypto'

export async function UploadVideoServerAction(formData: FormData) {
    console.log('UploadVideoServerAction', formData);

    // const pb = new PocketBase('http://127.0.0.1:8090');

    // const createdRecord = await pb.collection('videos')
    //     .create(formData);

    // const response = await fetch('http://127.0.0.1:8090/api/collections/videos/records', 
    // {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "multipart/form-data"
    //     },
    //     body: formData
    // });

    // const createdRecord = await response.json();

    // console.log(createdRecord);
    const id = crypto.randomUUID();
    const nome: string = formData.get('nome') as string;
    const file: File = formData.get('documents') as File;

    const fileData = await file.arrayBuffer();

    const normalized = nome.replace(" ", "_")
        .replace("(", "_")
        .replace(")", "_")

    await fsPromises.appendFile(`./public/${id}_${normalized}`, Buffer.from(fileData));

    // exec(`ffmpeg -i ./public/${normalized} -vcodec libx264 -crf 28 ./public/_${normalized}`, (error, stdout, sterr) => {
    //     console.log(error, stdout);
    // });

    // await run("ffmpeg", `-i ./public/${id}_${normalized} -vcodec libx264 -crf 28 ./public/_${id}_${normalized}`);

    // revalidatePath('/')
}

function run(command: string, args: string) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, [args]);

        process.on("message", message => {
            console.log("message", message);
        });
        process.on("error", message => {
            console.log("error", message);
        });
        process.on("close", message => {
            console.log("close", message);
        });
    });
}