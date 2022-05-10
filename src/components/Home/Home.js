import styles from "./Home.module.css"

import { useState, useEffect, useLayoutEffect } from "react"

import ArticleCard from "../layout/articleCard/ArticleCard"
import Container from "../container/Container"

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

    return (
        <div>
            <Container layout="articles_list">
                {articles && articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        title={article.title}
                        publishedAt={article.publishedAt} />
                ))}
            </Container>
        </div>
    )
}

export default Home;