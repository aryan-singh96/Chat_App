import React from "react";
import { FaPenAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="w-full min-h-32  shadow-gray-950 shadow-inner flex flex-col justify-between items-start px-4 py-8 bg-slate-800 text-white">
			<h1 className="font-bold text-lg flex items-center gap-4">
				<span>Chat Application</span>
				<FaPenAlt fontSize={16} />
			</h1>
			<div className="flex items-center justify-start w-full p-4 flex-wrap">
				<div className="flex flex-col min-w-[280px] w-[33%] my-3">
					<h1 className="font-semibold mb-2">Contact</h1>
					<span>Aryan Singh Chauhan</span>
					<span>Bareilly, Uttar Pradash</span>
					<span>Pincode:- 243001</span>
					<span>
						<Link
							to={"mailto:rajputaryan7651@gmail.com"}
							target="_blank"
							className="hover:text-blue-600 hover:underline"
						>
							rajputaryan7651@gmail.com
						</Link>
					</span>
				</div>
				<div className="flex flex-col min-w-[280px] w-[33%] my-3">
					<h1 className="font-semibold mb-2">Pages</h1>
					<span>
						<Link
							className="hover:text-blue-600 hover:underline"
							to={"/"}
						>
							Chat App
						</Link>
					</span>
					<span>
						<Link
							className="hover:text-blue-600 hover:underline"
							to={"/signin"}
						>
							SignIn
						</Link>
					</span>
					<span>
						<Link
							className="hover:text-blue-600 hover:underline"
							to={"/signup"}
						>
							SignUp
						</Link>
					</span>
					<span>
						<Link
							className="hover:text-blue-600 hover:underline"
							to={"/home"}
						>
							Home
						</Link>
					</span>
				</div>
				<div className="flex flex-col min-w-[280px] w-[33%] my-3">
					<h1 className="font-semibold mb-2">Links</h1>
					<span>
						<a
							className="hover:text-blue-600 hover:underline"
							href="https://www.linkedin.com/in/aryan-singh-chauhan-902056291"
							target="_blank"
							rel="noreferrer"
						>
							LinkedIn
						</a>
					</span>
					<span>
						<a
							className="hover:text-blue-600 hover:underline"
							href="https://github.com/aryan-singh96"
							target="_blank"
							rel="noreferrer"
						>
							Github
						</a>
					</span>
					<span>
						<a
							className="hover:text-blue-600 hover:underline"
							href="https://instagram.com/rising._.thakur/"
							target="_blank"
							rel="noreferrer"
						>
							Instagram
						</a>
					</span>
					<span>
						<a
							className="hover:text-blue-600 hover:underline"
							href="mailto:contact.rajputaryan7651@gmail.com"
							target="_blank"
							rel="noreferrer"
						>
							E-Mail
						</a>
					</span>
					<span>
						<a
							className="hover:text-blue-600 hover:underline"
							href="profiles.html"
							target="_blank"
							rel="noreferrer"
						>
							Profiles
						</a>
					</span>
				</div>
			</div>
			Created Realtime chat application with teammates.
		</div>
	);
};

export default Footer;
