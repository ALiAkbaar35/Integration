import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import "../../App.css"; // Import your custom CSS file

const Register = () => {
    const { registerUser } = useAuth();

    // State for formData and errors
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        // Update formData when input values change
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: "", email: "", phone: "", password: "" };

        // Validate name
        const nameRegex = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
        if (!formData.name || formData.name.length < 3 || !nameRegex.test(formData.name)) {
            isValid = false;
            newErrors.name = "Name is required at least 3 characters";
        }


        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            isValid = false;
            newErrors.email = "Valid email is required";
        }

        // Validate phone
        const phoneRegex = /^[0-9]{8}$/;
        if (!formData.phone || !phoneRegex.test(formData.phone)) {
            isValid = false;
            newErrors.phone = "Valid 8-digit phone number is required";
        }

        // Validate password
        if (!formData.password || formData.password.length < 6) {
            isValid = false;
            newErrors.password = "Password is required and must be at least 6 characters";
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (validateForm()) {
            const userInfo = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            };

          registerUser(userInfo);
        }
    };

    return (
        <div className="flex h-screen bg-slate-800">
        <div className="signup-container p-10 rounded-md shadow-md  bg-gray-900 ">
          <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
          />
          <h2 className="mt-4 text-center text-2xl text-white font-bold leading-9 tracking-tight">
              Sign up for an account
          </h2>
  
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-4">
           <div className="w-full md:w-1/2  md:mb-0 p-2">
            <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-white"
             >
            Full Name
             </label>
            <div className="mt-2">
               <input
                id="name"
                placeholder="Name....."
                name="name"
                type="text"
                autoComplete="name"
                required
                onChange={handleChange}
                value={formData.name}
                className="block w-full rounded-md border-0 py-1.5 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                 {errors.name && (
                <p className="mt-2 text-red-500 text-sm">{errors.name}</p>
                 )}
            </div>
        </div>
        <div className="w-full md:w-1/2  md:mb-0 p-2">
        <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-white"
         >
        Email address
       </label>
        <div className="mt-2">
            <input
                id="email"
                name="email"
                placeholder="Email....."
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
                value={formData.email}
                className="block w-full rounded-md border-0 py-1.5 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && (
                <p className="mt-2 text-red-500 text-sm">{errors.email}</p>
            )}
        </div>
        </div>
        <div className="w-full  pl-2 pr-2">
        <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-white"
        >
            Phone Number
        </label>
        <div className="mt-2">
            <input
                id="phone"
                name="phone"
                placeholder="Phone Number....."
                type="tel"
                autoComplete="tel"
                required
                onChange={handleChange}
                value={formData.phone}
                className="mt-2 block w-full rounded-md border-0 py-1.5 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
        {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
        )}
        </div>
        <div className="w-full  pl-2 pr-2">
            <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-white"
             >
            Password
            </label>
        <div className="mt-2">
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Password....."
                autoComplete="new-password"
                required
                onChange={handleChange}
                value={formData.password}
                className="mt-2 block w-full rounded-md border-0 py-1.5 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
        {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
        )}   
        </div>
        <div className="w-full  pl-2 pr-2 mt-4">
           <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign up
            </button>
        </div>
            </div>
                   
                </form>

                <p className="mt-4 text-center text-sm text-white">
                    Already have an account?{" "}
                    <a
                        href="\Login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
