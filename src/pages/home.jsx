import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import TableRoutes from "components/tables/TableRoutes";
import FilterOrders from "components/filter/FilterOrders";

const HomePage = () => {
  return (
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <FilterOrders />
        <TableRoutes />
      </main>
      <Footer />
      </div>
  );
};

export default HomePage;