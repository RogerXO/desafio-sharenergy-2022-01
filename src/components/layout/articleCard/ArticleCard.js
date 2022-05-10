import styles from "./ArticleCard.module.css"

function ArticleCard({ key, title, publishedAt }) {
    return (
        <article key={key}>
            <h3>{title}</h3>
            <p>{publishedAt}</p>
        </article>
    )
}

export default ArticleCard;