import { Comment } from './Comment';

export interface Document {
    id: string;
    name: string;
    link: string;
    comments: Comment[];
}
