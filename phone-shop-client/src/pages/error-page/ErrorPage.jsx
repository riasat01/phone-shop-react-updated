import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1 className="text-3xl">Something went wrong!!!</h1>
            <Link to={`/`}>Go to home</Link>
        </div>
    );
};

export default ErrorPage;