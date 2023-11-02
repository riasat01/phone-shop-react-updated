import { Link, NavLink } from "react-router-dom";
import Logo from "../../logo/Logo";
import { useContext } from "react";
import { UserAuth } from "../../auth-provider/AuthProvider";
import swal from 'sweetalert';
import default_img from '../../../assets/react.svg'

const Navbar = () => {

    const { user, logOut } = useContext(UserAuth);
    console.log(user);
    const handleSignOut = () => {
        logOut()
        .then(() => swal(`Info`, `You've sign out successfully`, 'info'))
        .catch(error => swal('Error', `${error.message}`, 'error'));
    }
    return (
        <nav className="flex justify-between items-center py-4">
            <Logo></Logo>
            <ul className="flex gap-6 items-center">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg px-3 py-2 font-bold  duration-500 text-transparent bg-clip-text" : ""
                        }
                    >
                        Home
                    </NavLink>
                </li>
                {
                    user &&
                    <li>
                        <NavLink
                            to="/favourites"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg px-3 py-2 font-bold  duration-500 text-transparent bg-clip-text" : ""
                            }
                        >
                            Favourites
                        </NavLink>
                    </li>
                }

                <li>
                    <NavLink
                        to="/login"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg px-3 py-2 font-bold  duration-500 text-transparent bg-clip-text" : ""
                        }
                    >
                        Login
                    </NavLink>
                </li>
            </ul>
            {
                user ?
                <details className="dropdown dropdown-end">
                <summary className="m-1 btn"><img src={default_img} alt="" /></summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <p className="text-xl font-semibold py-2">{user.displayName}</p>
                    <button onClick={handleSignOut} className="btn btn-outline btn-warning">Sign Out</button>
                </ul>
            </details>
            :
            <Link to='/login'><button className="btn btn-outline btn-info">Sign In</button></Link>
            }
            
        </nav>
    );
};

export default Navbar;