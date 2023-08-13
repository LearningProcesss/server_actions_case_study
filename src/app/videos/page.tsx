import Link from 'next/link';
import Video from './Video';
import Uploader from './Uploader';

export interface ResponseCollection<T> {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: T[]
}

export interface Video {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    nome: string
    sourceFile: string
}

async function getVideos() {
    return {
        page: 1,
        perPage: 50,
        totalItems: 1,
        totalPages: 1,
        items: [
            {
                id: "1",
                nome: "test"
            }
        ]
    } as ResponseCollection<Video>;
}

export default async function Videos() {

    const videos = await getVideos();

    return (
        <>
            <h1>Videos - count {videos?.totalItems}</h1>
            {videos?.items.map((video) => {
                return <Video key={video.id} video={video} />
            })}
            <Uploader />
        </>
    )
}