import { randomUUID } from 'node:crypto'

export class DataBaseMemory {

    #videos = new Map();

    create(video) {
        const videoId = randomUUID();

        this.#videos.set(videoId, video);
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id);
    }

    list(search) {
        // return Array.from(this.#videos.values()); // Converte uma estrutura de dados que não é array para arrey.
        return Array.from(this.#videos.entries())
            .map((videoArray) => {
                const id = videoArray[0];
                const data = videoArray[1];


                return {
                    id,
                    ...data
                }
            })
            .filter((video) => {
                if (search) {
                    return video.title.includes(search);
                }

                return true;
            })
    }
}