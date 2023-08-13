import Link from "next/link";
import { Video } from "./page";

export default function Video({ video }: { video: Video }) {
    const { id, nome } = video || {};

    return (
        <Link href={`/videos/${id}`}>
            <div>
                <p>Id: {id}</p>
                <p>Nome: {nome}</p>
            </div>
        </Link>
    )
}