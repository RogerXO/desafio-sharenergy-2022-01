import styles from "./ArticleCard.module.css"

import moment from 'moment'

function ArticleCard({ id, title, publishedAt }) {
    
    return (
        <article key={id}>
            <h3>{title}</h3>
            <p>{publishedAt}</p>
        </article>
    )
}

export default ArticleCard;