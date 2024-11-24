interface Tag {
    _id: string;
    name: string;
}

interface PostType {
    _id: string;
    name: string;
}

export interface Content {
    _id: string;
    title: string;
    content: string;
    author: string;
    tags: Tag[];
    type: PostType;
    createdAt: string;
    updatedAt: string;
    __v: number;
}