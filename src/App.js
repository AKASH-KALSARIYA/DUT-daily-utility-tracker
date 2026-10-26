import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ContactList from "./components/ContactList";
import Contactsus from "./components/Contactsus";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Aboutus from "./components/Aboutus";
import Dailytodo from "./components/Dailytodo";
import Expense from "./components/Expense";
import Login from "./components/Login";
import Weather from "./components/Weather";
import News from "./components/News";
import WeatherDetails from "./components/WeatherDetails";



function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactsus />} />
          <Route path="/contactlist" element={<ContactList />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/dailytodo" element={<Dailytodo/>} />
          <Route path="/expense" element={<Expense/>} />
          <Route path="/weather" element={<Weather/>} />
          <Route path="/news" element={<News/>} />
          <Route path="/weather-details" element={<WeatherDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
