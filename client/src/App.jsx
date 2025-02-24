import Popup from './components/Popup';
import Navbar from './components/Navbar';
import Spendings from './components/Pages/Spendings';

export default function App(){
  return (
    <div className="container">
      <Navbar className="mb-5"/>
      <Spendings/>
      <Popup/>
    </div>
  )
}