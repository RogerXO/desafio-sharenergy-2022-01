import styles from "./Home.module.css"

import { useState, useEffect } from "react"

import ArticleCard from "../layout/articleCard/ArticleCard"
import Container from "../container/Container"
import PaginationComponent from "../pagination/PaginationComponent/PaginationComponent"
import PaginationSelect from "../pagination/PaginationSelect/PaginationSelect"

function Home() {

    const [articles, setArticles] = useState([])
    const [articlesPerPage, setArticlesPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    const pages = Math.ceil(articles.length / articlesPerPage)
    const startIndex = currentPage * articlesPerPage
    const endIndex = startIndex + articlesPerPage
    const currentArticles = articles.slice(startIndex, endIndex)

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

    useEffect(() => {
        setCurrentPage(0)
    }, [articlesPerPage])

    return (
        <div>
            <PaginationSelect articlesPerPage={articlesPerPage} setArticlesPerPage={setArticlesPerPage} />

            <Container layout="articles_list">
                {articles && currentArticles.map((article) => (
                    <ArticleCard
                        id={article.id}
                        title={article.title}
                        publishedAt={article.publishedAt} />
                ))}
            </Container>

            <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
        </div>
    )
}

export default Home;