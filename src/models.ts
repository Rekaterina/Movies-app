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
    Action = 'Action',
    Adventure = 'Adventure',
    Comedy = 'Comedy',
    Crime = 'Crime',
    Documentary = 'Documentary',
    Drama = 'Drama',
    Family = 'Family',
    Horror = 'Horror',
    Music = 'Music',
    Mystery = 'Mystery',
}

export enum ModalType {
    Edit = 'Edit',
    Delete = 'Delete',
    Add = 'Add',
}

export enum SortOption {
    Title = 'Title',
    ReleaseDate = 'Release Date',
}

export enum SortField {
    Title = 'title',
    ReleaseDate = 'release_date',
}
