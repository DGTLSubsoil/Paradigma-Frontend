import {ITopicMetadata} from "@/interfaces/debates.interface";

export default async function fetchTopicMetadataFromIPFS(topic: any): Promise<ITopicMetadata | undefined> {
    try {
        if(!topic.ipfsUrl) return {
            topicId: topic.topicId,
            name: '',
            image: ''            
        };

        const response = await fetch(topic.ipfsUrl);
        const json = await response.json();

        return {
            topicId: topic.topicId,
            name: json.name,
            image: json.image
        }
    } catch (error) {
        console.log("Can not fetch from IPFS:", error);
    }
}

export async function fetchTopicMetadataFromIPFS_2(data: any){
    try {
        const response = await fetch(data.result);
        const json = await response.json();
        //console.log(json);
        

        return {
            ...data,
            point: json.point,
            image: json ? json.answer_data.find((el: any) => el?.id === Number(data.indexPositionAnswer))?.image : ''
        }
    } catch (error) {
        console.log("Can not fetch from IPFS:", error);
    }
}