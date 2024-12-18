import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="page">
      <Header />
      <main>
        <Content />
      </main>
      <Footer/>   
      </div>
  );
}

export default App;
