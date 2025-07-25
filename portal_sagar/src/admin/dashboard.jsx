import axios from "axios";
import AdminAbout from "./adminAbout";
import AdminIntro from "./adminIntro";
import "../App.css";
import "../index.css";
import { Tabs } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetPortfolioData,
  ShowLoading,
  HideLoading,
  ReloadData,
} from "../redux/rootSlice";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // make sure this is imported
import AdminExperience from "./experience";
import { useCallback } from "react";
import AdminEducation from "./education";
import AdminProjects from "./project";

function Dashboard() {
  const dispatch = useDispatch();
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );

  const getPortfolioData = useCallback(async () => {
    dispatch(ShowLoading());
    try {
      const response = await axios.get("api/portfolio/get-portfolio-data");
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(HideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData, getPortfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData, getPortfolioData]);

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
    {
      key: "3",
      label: "Experience",
      children: <AdminExperience />,
    },
    {
      key: "4",
      label: "Education",
      children: <AdminEducation />,
    },
    {
      key: "5",
      label: "Project",
      children: <AdminProjects />,
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
          <div>
            <h1 className="py-5 font-bold text-3xl">Admin Portfolio</h1>
          </div>
          <Tabs defaultActiveKey="1" items={tabItems} className="custom-tabs" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
