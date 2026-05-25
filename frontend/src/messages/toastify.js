import { toast, Bounce, Slide, Flip } from "react-toastify";

const successToast = (arg) => {
    toast.success(arg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,

    });
};

const errorToast = (arg) => {
    toast.error(arg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
    });
};

const warningToast = (arg) => {
    toast.warning(arg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
    });
};


export {
    successToast,
    errorToast,
    warningToast
}