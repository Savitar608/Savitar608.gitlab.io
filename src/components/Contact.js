// src/components/Contact.js

import React, { useRef } from 'react'
// import emailjs from 'emailjs-com'
import ReCAPTCHA from "react-google-recaptcha"

require("dotenv").config()

const { default: axios } = require("axios")

export default function Contact() {
	const [name, setName] = React.useState("")
	const [email, setEmail] = React.useState("")
	const [subject, setSubject] = React.useState("")
	const [message, setMessage] = React.useState("")

	const captchaRef = useRef(null)

	const handleSubmit = async (e) => {
		e.preventDefault()

		const token = captchaRef.current.getValue()
		captchaRef.current.reset()

		await axios.post("http://localhost:2000/post", { token })
			.then(res => {
				if (res.data === true)
					sendEmail(token)
			})
			.catch((error) => {
				console.log(error)
			})
	}


	const sendEmail = async (token) => {
		let params = {
			service_id: process.env.REACT_APP_EMAIL_SERVICE_ID,
			template_id: process.env.REACT_APP_EMAIL_TEMPLATE_ID,
			user_id: process.env.REACT_APP_EMAIL_KEY,
			template_params: {
				"name": document.getElementById("name").value,
				"email": document.getElementById("email").value,
				"subject": document.getElementById("subject").value,
				"message": document.getElementById("message").value,
				"g-recaptcha-response": token
			}
		}

		console.log(params)

		await axios.post("https://api.emailjs.com/api/v1.0/email/send", params)
			.then(() => {
				window.location.reload()  // If the page should be reloaded after sending email
			}, (error) => {
				console.log(error.text)
			})
	}

	return (
		<section id="contact" className="relative">
			<div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
				<div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
					<iframe
						width="100%"
						height="100%"
						title="map"
						className="absolute inset-0"
						style={{ filter: "opacity(0.7)" }}
						src="https://www.google.com/maps/embed/v1/place?q=Navya+Elite+Apartmnets,+27th+Main+Road,+VGS+Layout,+Muneshwara+Swamy+Layout,+Ejipura,+Bengaluru,+Karnataka,+India&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
					/>
					<div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
						<div className="lg:w-1/2 px-6">
							<h2 className="title-font font-semibold text-white tracking-widest text-xs">
								ADDRESS
							</h2>
							<p className="mt-1">
								Navya Elite Apartments, Ejpura <br />
								Bangalore, Karnataka 560047
							</p>
						</div>
						<div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
							<h2 className="title-font font-semibold text-white tracking-widest text-xs">
								EMAIL
							</h2>
							<a className="text-indigo-400 leading-relaxed">
								adithya608@gmail.com
							</a>
							<h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
								PHONE
							</h2>
							<p className="leading-relaxed">+91-8848309497</p>
						</div>
					</div>
				</div>
				<form
					name="contact-form"
					onSubmit={handleSubmit}
					className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
					<h2 className="text-white sm:text-4xl text-3xl mb-1 font-medium title-font">
						Contact me
					</h2>
					<p className="leading-relaxed mb-5">
						Hit me up if you want to discuss any collaborative work opportunities or even for just a normal conversation.
					</p>
					<div className="relative mb-4">
						<label htmlFor="name" className="leading-7 text-sm text-gray-400">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="relative mb-4">
						<label htmlFor="email" className="leading-7 text-sm text-gray-400">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="relative mb-4">
						<label htmlFor="subject" className="leading-7 text-sm text-gray-400">
							Subject
						</label>
						<input
							type="subject"
							id="subject"
							name="subject"
							className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							onChange={(e) => setSubject(e.target.value)}
						/>
					</div>
					<div className="relative mb-4">
						<label
							htmlFor="message"
							className="leading-7 text-sm text-gray-400">
							Message
						</label>
						<textarea
							id="message"
							name="message"
							className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
					<ReCAPTCHA
						sitekey={process.env.REACT_APP_SITE_KEY}
						ref={captchaRef}
					/>
					<button
						type="submit"
						className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
						Submit
					</button>
				</form>
			</div>
		</section>
	)
}