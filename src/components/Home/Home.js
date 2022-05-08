import styles from "./Home.module.css"

import { useState, useEffect, useLayoutEffect } from "react"

function Home() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch("https://api.spaceflightnewsapi.net/v3/articles", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((data) => setArticles(data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        function SortArticleByLatest(articles) {

            const sortedArticles = []

            articles.reduce(function (prev, cur) {
                if (prev < cur.publishedAt) {
                    sortedArticles.unshift(prev)
                }
                else {
                    sortedArticles.push(cur)
                }
            }, sortedArticles)

            setArticles(sortedArticles)
        }
    }, [articles])

    console.log(articles)

    return (
        <div>
            home
        </div>
    )
}

export default Home;