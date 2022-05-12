import styles from "./Home.module.css"

import { useState, useEffect, useMemo } from "react"

import ArticleCard from "../layout/articleCard/ArticleCard"
import Container from "../container/Container"
import PaginationComponent from "../layout/pagination/PaginationComponent/PaginationComponent"
import PaginationSelect from "../layout/pagination/PaginationSelect/PaginationSelect"

function Home() {

    const [articles, setArticles] = useState([])
    const [articlesPerPage, setArticlesPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')

    const pages = Math.ceil(articles.length / articlesPerPage)
    const startIndex = currentPage * articlesPerPage
    const endIndex = startIndex + articlesPerPage
    const currentArticles = articles.slice(startIndex, endIndex)

    const filteredArticles = useMemo(() => {
        const lowerSearch = search.toLowerCase()

        return articles.filter((article) => {
            return article.title.toLowerCase().includes(lowerSearch)
        })
    }, [search])

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
                    return sortedArticles.unshift(prev)
                }
                else {
                    return sortedArticles.push(cur)
                }
            }, sortedArticles)

            setArticles(sortedArticles)
        }
    }, [articles])

    useEffect(() => {
        setCurrentPage(0)
    }, [articlesPerPage])

    return (
        <section>
            <div className={styles.search_div}>
                <input className={styles.search_input} type="search" placeholder=" Search for..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <PaginationSelect articlesPerPage={articlesPerPage} setArticlesPerPage={setArticlesPerPage} />
            </div>
            <Container layout="articles_list">
                {articles && currentArticles.map((article) => (
                    <ArticleCard
                        id={article.id}
                        title={article.title}
                        publishedAt={article.publishedAt} />
                ))}
            </Container>
            <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
        </section>
    )
}

export default Home;