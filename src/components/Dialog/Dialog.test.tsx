import { render, fireEvent, screen } from '@testing-library/react';
import Dialog from './Dialog';

describe('Dialog', () => {
    it('renders correctly', () => {
        render(
            <Dialog title="Test Title" onCloseClick={() => {}}>
                <div />
            </Dialog>,
        );
        const modal = screen.getByText('Test Title');
        expect(modal).toBeInTheDocument();
    });

    it('displays the correct title', () => {
        render(
            <Dialog title="Test Title" onCloseClick={() => {}}>
                <div />
            </Dialog>,
        );
        const title = screen.getByText('Test Title');
        expect(title).toBeInTheDocument();
    });

    it('displays children when passed in', () => {
        render(
            <Dialog title="Test Title" onCloseClick={() => {}}>
                <div>Test Child</div>
            </Dialog>,
        );
        const child = screen.getByText('Test Child');
        expect(child).toBeInTheDocument();
    });

    it('executes onCloseClick prop when close button is clicked', () => {
        const handleClose = jest.fn();
        render(
            <Dialog title="Test Title" onCloseClick={handleClose}>
                <div />
            </Dialog>,
        );
        fireEvent.click(screen.getByText('×'));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
