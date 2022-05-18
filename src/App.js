import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./components/home/Home"
import ArticleCard from './components/layout/articles/articlesCard/Article';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/article/:id" element={<ArticleCard/>} />
      </Routes>
    </Router>
  );
}

export default App;
