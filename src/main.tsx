import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import NiceModal from "@ebay/nice-modal-react";
import { store } from "./app/store";
import "./index.css";
import { SetBits } from "./setBits/SetBits";
import { Button, ConfigProvider, theme } from 'antd';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Provider store={store}>
        <NiceModal.Provider>
          <SetBits />
        </NiceModal.Provider>
      </Provider>
  </React.StrictMode>
);
