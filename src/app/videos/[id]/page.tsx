import PocketBase from 'pocketbase';

async function getVideo(id: string) {

    const res = await fetch(`http://127.0.0.1:8090/api/collections/videos/records/${id}`,
        { next: { revalidate: 10 } })

    // const pocketClient = new PocketBase('http://127.0.0.1:8090');

    // const video = await pocketClient.collection('videos')
    //                                 .getOne(id);

    return await res.json();
}

export default async function Video({ params }: { params: { id: string } }) {
    console.log(params);

    const video = await getVideo(params.id);

    return (
        <>
            <h2>VideoId: {video.id}</h2>
        </>
    )
}