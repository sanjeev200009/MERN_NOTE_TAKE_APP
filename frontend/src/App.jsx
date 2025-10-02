import {Routes, Route} from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import { Toaster } from "react-hot-toast"


const App = () => {
  return (
    <div>
        <Toaster position="top-right" />
        <Routes>
            <Route path="/" element={<HomePage/>} />
             <Route path="/create" element={<CreatePage/>} />
              <Route path="/note/:id" element={<NoteDetailPage/>} />
       </Routes>
    </div>
  )
}

export default App