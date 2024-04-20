import { ModalType, SortField, SortOption } from './models';

export const DIALOG_TITLE_MAP = {
    [ModalType.Add]: 'Add Movie',
    [ModalType.Edit]: 'Edit Movie',
    [ModalType.Delete]: 'Delete Movie',
};

export const SORT_OPTION_TO_MOVIE_FIELD_MAP = {
    [SortOption.ReleaseDate]: SortField.ReleaseDate,
    [SortOption.Title]: SortField.Title,
};
