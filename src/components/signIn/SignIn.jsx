import logo from "assets/logo/logo.png"
import image from "assets/signIn.webp";

const Login = () => {
    return (
      <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src={image} alt="" className="w-full h-full object-cover object-top"/>
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto lg:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-150 ">
          <a href="/"><img src={logo} alt="logo BAMX Tepatitlán" className="w-24 object-cover"/></a>
          <h2 className="text-xl md:text-3xl font-bold leading-tight mt-12">Crea tu cuenta</h2>
          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Nombre de usuario</label>
              <input type="text" name="username" id="username" placeholder="Ingrese su nombre de usuario" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required/>
            </div>
            <div>
              <label className="block text-gray-700">Correo electrónico </label>
              <input type="email" name="email" id="email" placeholder="Ingrese su correo" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required/>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Contraseña</label>
              <input type="password" name="password" id="password" placeholder="Ingrese su contraseña" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Vuelva a ingresar su contraseña</label>
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Repita su contraseña" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
            </div>
            <button type="submit" className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">Crear cuenta</button>
          </form>
          <p className="mt-8">¿Ya tiene una cuenta? <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">Inicia sesión</a> </p>
          <p className="text-sm text-gray-500 mt-12"> &copy; {new Date().getFullYear()} Banco Diocesano de Alimentos de los Altos </p>
        </div>
      </div>
    </section>
    );
};

export default Login;