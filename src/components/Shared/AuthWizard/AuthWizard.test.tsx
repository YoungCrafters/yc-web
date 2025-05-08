import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthWizard } from './AuthWizard'
import { AUTH_STEPS } from './types'

describe('AuthWizard', () => {
  const mockOnAuthSuccess = jest.fn()

  beforeEach(() => {
    mockOnAuthSuccess.mockClear()
  })

  it('renders login form by default', () => {
    render(<AuthWizard onAuthSuccess={mockOnAuthSuccess} />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('switches to register form when register button is clicked', () => {
    render(<AuthWizard onAuthSuccess={mockOnAuthSuccess} />)
    
    fireEvent.click(screen.getByRole('button', { name: /register/i }))
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  })

  it('shows validation errors for invalid login form submission', async () => {
    render(<AuthWizard onAuthSuccess={mockOnAuthSuccess} />)
    
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
    })
  })

  it('shows validation errors for invalid register form submission', async () => {
    render(<AuthWizard initialStep={AUTH_STEPS.REGISTER} onAuthSuccess={mockOnAuthSuccess} />)
    
    fireEvent.click(screen.getByRole('button', { name: /register/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
    })
  })

  it('calls onAuthSuccess when login form is submitted with valid data', async () => {
    render(<AuthWizard onAuthSuccess={mockOnAuthSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    })
    
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))
    
    await waitFor(() => {
      expect(mockOnAuthSuccess).toHaveBeenCalled()
    })
  })

  it('calls onAuthSuccess when register form is submitted with valid data', async () => {
    render(<AuthWizard initialStep={AUTH_STEPS.REGISTER} onAuthSuccess={mockOnAuthSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^password/i), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    })
    
    fireEvent.click(screen.getByRole('button', { name: /register/i }))
    
    await waitFor(() => {
      expect(mockOnAuthSuccess).toHaveBeenCalled()
    })
  })
}) 