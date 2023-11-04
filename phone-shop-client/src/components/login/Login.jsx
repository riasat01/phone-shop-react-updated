import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../auth-provider/AuthProvider";
import swal from 'sweetalert';
// import axios from "axios";

const Login = () => {

    const {signIn} = useContext(UserAuth);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignIn = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password)
        .then(userCredential => {
            // console.log(userCredential);
            swal(`Congratularion ${userCredential.user.displayName}`, `You've logged in successfully`, 'success');
            navigate(location?.state ? location.state : '/');
            // axios.post('https://phone-shop-server-steel.vercel.app/jwt', {email}, {withCredentials: true})
            // .then(res => {
            //     console.log(res.data.success);
            //     res.data.success && navigate(location?.state ? location.state : '/');
            // })
        })
        .catch(error => swal('Error', `${error.message}`, 'error'));
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative flex w-96 flex-col rounded-xl bg-slate-900 bg-clip-border text-gray-500 shadow-md">
                <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
                    <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                        Sign In
                    </h3>
                </div>
                <form onSubmit={handleSignIn}>
                <div className="flex flex-col gap-4 p-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder="Email" name="email" type="email"
                        />
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder="Password" name="password" type="password"
                        />
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <button
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit"
                        data-ripple-light="true"
                    >
                        Sign In
                    </button>
                    <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                        Do not have an account?
                        <Link
                            to='/login/register'
                            className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Login;