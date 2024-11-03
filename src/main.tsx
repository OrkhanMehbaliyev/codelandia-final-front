import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        layout={{ style: { color: "transparent" } }}
        theme={{
          token: {
            colorPrimary: "var(--color-primary)",
            borderRadius: 2,
            colorText: "#ffffff",
            colorBgContainer: "var(--color-background)",

            colorBgBase: "var(--color-background)",
            colorTextBase: "#fff",
            colorTextSecondary: "var(--color-primary)",
            colorBorder: "#DF3E1E",
          },
          components: {
            Rate: {
              colorText: "orange",
            },
            Button: {
              defaultColor: "white",
              defaultBg: "var(--color-primary)",
              defaultHoverBg: "white",
              defaultHoverColor: "var(--color-primary)",
            },
            Input: {
              colorBgContainer: "white",
              colorText: "black",
              colorTextPlaceholder: "gray",
            },
            InputNumber: {
              colorBgContainer: "white",
              colorText: "black",
              colorTextPlaceholder: "gray",
              handleBg: "var(--color-primary)",
            },
            Menu: {
              itemHeight: "60px",
              itemActiveBg: "var(--color-primary)",
              itemHoverBg: "var(--color-primary)",
              itemHoverColor: "black",
              itemSelectedColor: "white",
              itemSelectedBg: "var(--color-primary)",
              itemBg: "",
            },
            Pagination: {
              itemActiveBg: "var(--color-primary)",
              itemActiveColorDisabled: "green",
            },
            Select: { colorIcon: "blue" },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
