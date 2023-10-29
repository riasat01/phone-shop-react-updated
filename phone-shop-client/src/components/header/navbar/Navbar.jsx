import { NavLink } from "react-router-dom";
import Logo from "../../logo/Logo";

const Navbar = () => {
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
        </nav>
    );
};

export default Navbar;