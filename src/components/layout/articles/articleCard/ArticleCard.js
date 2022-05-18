import styles from "./ArticleCard.module.css"

import { Link } from "react-router-dom"

function ArticleCard({ id, title, publishedAt }) {

    return (
        <Link to={`/article/${id}`}>
            <article key={id} className={styles.article_listed} >
                <h3>{title}</h3>
                <p>{publishedAt}</p>
            </article >
        </Link>

    )
}

export default ArticleCard;