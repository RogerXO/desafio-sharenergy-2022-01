import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./components/home/Home"
import Article from './components/articles/articles/Article';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prevArticle/:id" element={<Article />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/nextArticle/:id" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;
