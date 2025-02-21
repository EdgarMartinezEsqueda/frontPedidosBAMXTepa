import Navbar from "components/navbar/Navbar";
import Error404 from "components/error/404";
import Footer from "components/footer/Footer";

const ErrorPage = () =>{
    return (
      <>
        <Navbar/>
        <Error404/>
        <Footer/>
      </>
    );
};

export default ErrorPage;