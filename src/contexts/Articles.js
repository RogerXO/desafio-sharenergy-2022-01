import { createContext,  useEffect,  useState } from "react";

export const ArticlesContext = createContext()

export const ArticlesProvider = ({ children }) => {
    const [getArticles, setGetArticles] = useState([])
    
    const fetchArticles = () => {
        fetch("https://api.spaceflightnewsapi.net/v3/articles", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setGetArticles(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchArticles()
    },[])

    return (
        <ArticlesContext.Provider value={{ getArticles, fetchArticles: fetchArticles }}>
            {children}
        </ArticlesContext.Provider>
    )
}