function Layout({ children, className = '' }) {
    return (
        <div className={`container-custom ${className}`}>
            {children}
        </div>
    );
}

export default Layout;
