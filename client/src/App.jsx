import "./App.css";
import Content from "./components/Content";

function App() {
  return (
    <div className="page">
      <header className="header">HEADER</header>
      <main className="content">
        <Content />
      </main>
      <footer className="footer">footer</footer>
    </div>
  );
}

export default App;
