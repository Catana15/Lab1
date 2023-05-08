import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Topics from './components/Topics';
import Settings from './components/Settings';
export const Main = () => {
return (         
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/topics' element={<Topics/>} />
    <Route path='/settings' element={<Settings/>} />
  </Routes>
);
}
export default Main;