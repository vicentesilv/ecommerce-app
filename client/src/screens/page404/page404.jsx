import './page404.css';

function Page404() {

    const redireccionar = () => {
        setTimeout(() => {
            window.location.href = '/productos';
        }, 2000);
    }
    redireccionar();

    return (
        <div className="page404">
            <div className="header404">
                <h1>404</h1>
                <h2>Page Not Found</h2>
            </div>
        </div>
    )   
    
}

export default Page404;