import Calculator from "./components/Calculator";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen bg-indigo-50">
        <Calculator/>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
