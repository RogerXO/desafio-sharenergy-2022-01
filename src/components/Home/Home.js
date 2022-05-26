import styles from "./Home.module.css"

import { useState, useEffect, useMemo, useContext } from "react"

import moment from 'moment'

import { ArticlesContext } from "../../contexts/ContextArticles"
import ArticleCard from "../articles/articleCard/ArticleCard"
import Container from "../layout/container/Container"
import PaginationComponent from "../layout/pagination/PaginationComponent/PaginationComponent"
import PaginationSelect from "../layout/pagination/PaginationSelect/PaginationSelect"
import DatePicker from "../layout/datePicker/DatePicker"

function Home() {
    const { provideArticles } = useContext(ArticlesContext)

    const [articlesPerPage, setArticlesPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')
    const [listedArticles, setListedArticles] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const articles = provideArticles

    //Pagination
    const pages = Math.ceil(listedArticles.length / articlesPerPage)
    const startIndex = currentPage * articlesPerPage
    const endIndex = startIndex + articlesPerPage
    const currentArticles = listedArticles.slice(startIndex, endIndex)

    useMemo(() => {
        const sortedArticlesByLatest = articles.sort(function (a, b) {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        });

        setListedArticles(sortedArticlesByLatest)
    }, [articles])

    // Search filter
    const filteredArticles = useMemo(() => {
        const lowerSearch = search.toLowerCase()

        return articles.filter((article) => {
            return article.title.toLowerCase().includes(lowerSearch)
        })
    }, [search])

    // Date Filter
    const filteredArticlesByDate = useMemo(() => {
        const formatedDate = articles.map((article) => {
            return moment(article.publishedAt).format("YYYY-MM-DD")
        })

        for (let i = 0; i < articles.length; i++) {
            articles[i].publishedAt = formatedDate[i]
        }

        return articles.filter((article) => {
            return article.publishedAt >= startDate && article.publishedAt <= endDate
        })
    }, [startDate, endDate])

    useEffect(() => {
        setCurrentPage(0)
    }, [articlesPerPage])

    useEffect(() => {
        setListedArticles(filteredArticles)

        if (!search) {
            setListedArticles(articles)
        }
    }, [search])

    function submitDate() {
        setListedArticles(filteredArticlesByDate)
    }

    return (
        <section>
            <div className={styles.search_div}>
                <input
                    className={styles.search_input}
                    type="search"
                    placeholder=" Search for..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                />
                <DatePicker
                    endDate={endDate}
                    setEndDate={setEndDate}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    submitDate={submitDate}
                />
                <PaginationSelect
                    articlesPerPage={articlesPerPage}
                    setArticlesPerPage={setArticlesPerPage}
                />
            </div>
            <Container layout="articles_list">
                {articles && currentArticles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        publishedAt={moment(article.publishedAt).format("MM/DD/YYYY")}
                    />
                ))}
            </Container>
            <PaginationComponent
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={pages}
            />
        </section>
    )
}

export default Home;