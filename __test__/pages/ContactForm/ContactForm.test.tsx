import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ContactForm from '@pages/ContactForm';

jest.mock('@pages/ContactForm/components/Form', () => {
  const MockForm = () => <div>Mock Form Component</div>;
  MockForm.displayName = 'Form';
  return MockForm;
});

describe('ContactForm Component', () => {
  it('should render correctly', () => {
    render(<ContactForm />);

    expect(screen.getByText('Contact Form')).toBeInTheDocument();

    expect(screen.getByText('Mock Form Component')).toBeInTheDocument();
  });
});
