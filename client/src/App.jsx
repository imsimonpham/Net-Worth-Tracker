import Popup from './components/Others/Popup';
import Navbar from './components/Others/Navbar';
import Activity from './components/Pages/Activity';

export default function App(){
  return (
    <div className="container">
      <Navbar className="mb-5"/>
      <Activity/>
      <Popup/>
    </div>
  )
}