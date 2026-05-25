import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { errorToast, successToast } from "../messages/toastify.js";
import Loader from "../components/Loader.jsx";
import { useNavigate, useParams } from "react-router-dom";
import apis from "../../config/apis.js";
import axios from "axios";
const ActivateAccount = () => {
  const navigate = useNavigate()
  const { token } = useParams();
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    if (token) {
      createAccount();
    }
  }, [token]);
  const createAccount = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(`${apis[0]}/signup`, { token });
      const { error, success } = data;
      setLoader(false);
      if (error) {
        errorToast(error);
        setLoader(false);
        setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    if (success) {
      successToast(success);
      setTimeout(() => {
        navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setLoader(false);
    }
  };

  return loader && <Loader />;
};

export default ActivateAccount;
