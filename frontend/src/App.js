import { BrowserRouter , Routes, Route } from "react-router-dom";

import Home from './Home'
import Huddle from './huddle/huddle'
function App() {
  return (
<>



<BrowserRouter>
<Routes>
  <Route path='/' element={<Home /> } />
  <Route path='/huddle' element={<Huddle />} />

</Routes>
</BrowserRouter> 

</>);
}

export default App;
