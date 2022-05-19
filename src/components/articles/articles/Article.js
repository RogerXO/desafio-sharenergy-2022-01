import styles from './Article.module.css'

import moment from "moment"

import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useMemo } from 'react'

import Container from '../../layout/container/Container'
import ArticleButton from '../../layout/ArticleButton/ArticleButton'

function Article() {
    const { id } = useParams()

    const navigate = useNavigate()

    const [articles, setArticles] = useState([])
    const [article, setArticle] = useState([])
    const [nextArticle, setNextArticle] = useState()
    const [prevArticle, setPrevArticle] = useState()

    // OK - fetch the whole articles
    // OK - filter the next and previous ID by actual article ID and set nextID and previousID
    // NA - Then Link and navigate to the articles details

    useEffect(() => {
        fetch(`https://api.spaceflightnewsapi.net/v3/articles/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setArticle(data)
            })
            .catch((err) => console.log(err))
    }, [])

    useMemo(() => {
        fetch("https://api.spaceflightnewsapi.net/v3/articles", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setArticles(data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        const currentArticleIndex = articles.findIndex(x => x.id === article.id)
        const prevArticleIndex = currentArticleIndex - 1
        const nextArticleIndex = currentArticleIndex + 1

        setPrevArticle(articles[prevArticleIndex])
        setNextArticle(articles[nextArticleIndex])
    }, [article])

    return (
        <div className={styles.align}>
            {prevArticle && (
                <ArticleButton to={`/article/${prevArticle.id}`} text="Prev" />
            )}
            {!prevArticle && (
                <ArticleButton text="Home" to="/" />
            )}

            <article className={styles.article_read}>
                <Container layout="articles_read">
                    <div className={styles.div_img}>
                        <img src={article.imageUrl} alt="article image" />
                    </div>
                    <div className={styles.notice_data}>
                        <span>
                            <strong>updated at:</strong> {moment(article.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </span>
                        <h1>{article.title}</h1>
                        <p>{article.summary}</p>
                        <a href={article.url} target="_blank">Click here to see the original news</a>
                    </div>
                </Container>
            </article>

            {nextArticle && (
                <ArticleButton to={`/article/${nextArticle.id}`} text="Next" />
            )}
            {!nextArticle && (
                <ArticleButton text="Home" to="/" />
            )}
        </div>
    )
}

export default Article