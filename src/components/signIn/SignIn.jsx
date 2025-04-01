import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router";

import logo from "assets/logo/logo.png";
import image from "assets/signIn.webp";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [clientErrors, setClientErrors] = useState({});

  const { mutate, isError, isPending, error, isSuccess } = useMutation({
    mutationFn: async (userData) => {
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success(
        "Usuario registrado correctamente.\nEspera aprobación del administrador.",
        { duration: 7000 }
      );
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    },
    onError: (error) => {
      toast.error(error.message || "Error durante el registro");
    },
  });

  useEffect(() => {
    const errors = {};
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    setClientErrors(errors);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(clientErrors).length > 0) return;
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img 
          src={image} 
          alt="Ilustración de registro" 
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto lg:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-150">
          <Link to="/">
            <img 
              src={logo} 
              alt="Logo de Banco de Alimentos" 
              className="w-24 object-cover"
            />
          </Link>
          
          <h2 className="text-xl md:text-3xl font-bold leading-tight mt-12">
            Crea tu cuenta
          </h2>

          <form className="mt-6" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                onChange={handleInputChange}
              />
              {clientErrors.email && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                onChange={handleInputChange}
              />
              {clientErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {clientErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending || Object.keys(clientErrors).length > 0}
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-8">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
              Inicia sesión
            </Link>
          </p>
          
          <p className="text-sm text-gray-500 mt-12">
            &copy; {new Date().getFullYear()} Banco Diocesano de Alimentos de los Altos
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;