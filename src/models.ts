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
    Adventure = 'adventure',
    Comedy = 'comedy',
    Crime = 'crime',
    Documentary = 'documentary',
    Drama = 'drama',
    Horror = 'horror',
    Mystery = 'mystery',
}

export enum ModalType {
    Edit = 'Edit',
    Delete = 'Delete',
    Add = 'Add',
}

export enum SortOption {
    Title = 'title',
    ReleaseDate = 'release date',
}

export enum SortField {
    Title = 'title',
    ReleaseDate = 'release_date',
}
