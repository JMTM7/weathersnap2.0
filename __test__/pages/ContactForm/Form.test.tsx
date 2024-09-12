import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form from '@pages/ContactForm/components/Form';

jest.mock('@data/phonePrefixes.json', () => [
  { value: '+44', label: 'UK' },
  { value: '+1', label: 'US' },
]);

describe('Form Component', () => {
  it('should render variables and buttons correctly', () => {
    render(<Form />);

    expect(screen.getByLabelText(/Name\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of birth\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone\*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should handle input changes', async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Name\*/i), {
      target: { value: 'John' },
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/Name\*/i)).toHaveValue('John');
    });

    fireEvent.change(screen.getByLabelText(/Date of birth\*/i), {
      target: { value: '1999-01-01' },
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/Date of birth\*/i)).toHaveValue(
        '1999-01-01'
      );
    });

    fireEvent.change(screen.getByLabelText(/City\*/i), {
      target: { value: 'Toronto' },
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/City\*/i)).toHaveValue('Toronto');
    });

    fireEvent.change(screen.getByLabelText(/Email\*/i), {
      target: { value: 'test@example.com' },
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/Email\*/i)).toHaveValue('test@example.com');
    });

    fireEvent.change(screen.getByLabelText(/Phone\*/i), {
      target: { value: '123456789' },
    });
    await waitFor(() => {
      const phonePrefixSelect = screen
        .getByLabelText(/Phone\*/i)
        .closest('div')
        ?.querySelector('select') as HTMLSelectElement;
      expect(phonePrefixSelect).toBeInTheDocument();
      expect(phonePrefixSelect?.value).toBe('+44');

      const phoneInput = screen
        .getByLabelText(/Phone\*/i)
        .closest('div')
        ?.querySelector('input[type="tel"]') as HTMLInputElement;
      expect(phoneInput).toBeInTheDocument();
      expect(phoneInput?.value).toBe('');
    });
  });

  it('should manage the enabling of the send button when all fields are filled in', async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Name\*/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Date of birth\*/i), {
      target: { value: '1999-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/City\*/i), {
      target: { value: 'Toronto' },
    });
    fireEvent.change(screen.getByLabelText(/Email\*/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Phone\*/i), {
      target: { value: '123456789' },
    });

    const phonePrefixSelect = screen
      .getByLabelText(/Phone\*/i)
      .closest('div')
      ?.querySelector('select');
    if (phonePrefixSelect) {
      fireEvent.change(phonePrefixSelect, {
        target: { value: '+1' },
      });
    }

    const phoneInput = screen
      .getByLabelText(/Phone\*/i)
      .closest('div')
      ?.querySelector('input[type="tel"]');
    if (phoneInput) {
      fireEvent.change(phoneInput, {
        target: { value: '123456789' },
      });
    }

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit' })).not.toBeDisabled();
    });
  });
});
