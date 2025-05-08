import { cva } from 'class-variance-authority'

export const authWizardVariants = cva(
  'w-full max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800',
  {
    variants: {
      variant: {
        default: 'border border-gray-200 dark:border-gray-700',
        elevated: 'shadow-xl',
      },
      size: {
        default: 'min-h-[400px]',
        compact: 'min-h-[300px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export const formFieldStyles = {
  label: 'block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1',
  input: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white',
  error: 'text-sm text-red-600 dark:text-red-400 mt-1',
  button: 'w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800',
} 