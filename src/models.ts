export interface Movie {
    id: number;
    title: string;
    tagline?: string;
    vote_average?: number;
    vote_count?: number;
    release_date?: string;
    poster_path: string;
    overview: string;
    budget?: number;
    revenue?: number;
    runtime: number;
    genres: Genre[];
}

export enum Genre {
    All = 'All',
    Documentary = 'Documentary',
    Comedy = 'Comedy',
    Horror = 'Horror',
    Crime = 'Crime',
    Adventure = 'Adventure',
    Mystery = 'Mystery',
}

export enum ModalType {
    Edit = 'Edit',
    Delete = 'Delete',
    Add = 'Add',
}
