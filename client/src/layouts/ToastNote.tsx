import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastNote() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      transition={Slide}
      pauseOnHover
      theme="light"
    />
  )
}

export default ToastNote;