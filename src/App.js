import { BrowserRouter } from "react-router-dom";
import IndexRouter from "./routes";


function App() {
  return (
    <div >
      <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
