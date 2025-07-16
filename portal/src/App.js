import AdminAbout from "./admin/adminAbout";
import AdminIntro from "./admin/adminIntro";
import "./App.css";
import { Tabs } from "antd";
const { TabPane } = Tabs;

function App() {
  return (
    <div className="App p-4">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Intro" key="1">
          <AdminIntro />
        </TabPane>
        <TabPane tab="About us" key="2">
          <AdminAbout />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
