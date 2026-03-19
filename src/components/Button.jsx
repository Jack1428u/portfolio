'use client';

function Button({ variant = 'primary', size = 'md', onClick, children, className = '' }) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-dark-bg';

    const variants = {
        primary: 'bg-accent-primary text-white hover:bg-accent-secondary',
        outline: 'border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white',
        ghost: 'text-gray-300 hover:text-accent-primary',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
