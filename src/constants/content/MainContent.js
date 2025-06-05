// import appLogo from "../../assets/app/appLogo.jpg";
import axios from "axios";
import appLogoClr from "../../assets/app/appLogoTran.png";
import { Store } from "lucide-react";
export const MainContent = {
  appName: "BITBLOCK",
  appLogo: appLogoClr,
  appLogoClr: appLogoClr,
  appURL: "",
  contactNo: "+919302826662",
  email: "info@example.com",
  address: "ABC Mall, Salaiya Road, Bhopal, Madhya Pradesh 462002",
  telegram_link: "https://t.me/YourTelegramUsername",
};

export const backendConfig = {


  base: "http://192.168.1.57:1920/api",
  origin: "http://192.168.1.57:1920",
  // base: "https://api.ftnetwork.online/api",
  // origin: "https://api.ftnetwork.online",
  // base: "https://cnfp6kct-1921.inc1.devtunnels.ms/api",
  // origin: "https://cnfp6kct-1921.inc1.devtunnels.ms",
  // base: "https://cnfp6kct-1921.inc1.devtunnels.ms/api",
  // origin: "https://cnfp6kct-1921.inc1.devtunnels.ms",
};


export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const state = Store.getState();
    const token = state?.auth?.token;

    console.log(token)
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);