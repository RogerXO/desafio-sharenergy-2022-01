import styles from './Article.module.css'

import moment from "moment"

import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Container from '../../../container/Container'

function Article() {
    const { id } = useParams()

    const [article, setArticle] = useState([])

    useEffect(() => {
        fetch(`https://api.spaceflightnewsapi.net/v3/articles/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => setArticle(data))
            .catch((err) => console.log(err))
    }, [])

    console.log(article)

    return (
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
    )
}

export default Article