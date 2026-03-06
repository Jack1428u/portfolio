function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-smooth rounded-lg focus-ring';

    const variants = {
        primary: 'bg-accent-primary hover:bg-accent-secondary text-white',
        secondary: 'bg-dark-card hover:bg-dark-surface border border-dark-border-emphasis text-gray-100',
        outline: 'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes} {...props}>
            {children}
        </button>
    );
}

export default Button;
