import axios from "axios";
import AdminAbout from "./admin/adminAbout";
import AdminIntro from "./admin/adminIntro";
import "./App.css";
import "./index.css";
import { Tabs } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetPortfolioData, ShowLoading, HideLoading } from "./redux/rootSlice";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // make sure this is imported

function App() {
  const dispatch = useDispatch();
  const { loading, portfolioData } = useSelector((state) => state.root);

  const getPortfolioData = async () => {
    dispatch(ShowLoading());
    try {
      const response = await axios.get("api/portfolio/get-portfolio-data");
      dispatch(SetPortfolioData(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getPortfolioData();
  }, []);

  const tabItems = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About Us",
      children: <AdminAbout />,
    },
  ];

return (
  <div className="min-h-screen bg-[#000515] text-white px-5 md:px-10">
    {/* Global toast message handler */}
    <ToastContainer position="top-right" autoClose={3000} />

    {/* Loading spinner (global) */}
    {loading && (
      <div className="loader-wrapper flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={40} />
      </div>
    )}

    {/* Main content */}
    {portfolioData && (
      <div>
        <Tabs defaultActiveKey="1" items={tabItems}  className="custom-tabs" />
      </div>
    )}
  </div>
);


}

export default App;
