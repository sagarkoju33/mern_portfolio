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
  useEffect(() => {
    console.log(portfolioData);
  }, [portfolioData]);

  if (loading) {
    return <Loader />;
  }

  const tabItems = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About us",
      children: <AdminAbout />,
    },
  ];

  return (
    <>
      {portfolioData && (
        <div className="mt-5 p-10">
          <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
      )}
    </>
  );
}

export default App;
