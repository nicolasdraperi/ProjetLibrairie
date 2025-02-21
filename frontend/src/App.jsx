import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/ListBooks";
import AddBook from "./components/AddBook";

const App = () => {
    return (
        <Router>
            <div className="container mt-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm rounded p-3 mb-4">
                    <div className="container">
                        <Link className="navbar-brand fw-bold" to="/">📖 Gestion de Livres</Link>
                        <div className="ml-auto">
                            <Link className="btn btn-outline-primary me-2" to="/">📚 Liste des Livres</Link>
                            <Link className="btn btn-success" to="/add">➕ Ajouter un Livre</Link>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddBook />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
