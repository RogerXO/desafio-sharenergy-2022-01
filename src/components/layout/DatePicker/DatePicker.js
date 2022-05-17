import styles from "./DatePicker.module.css"

function DatePicker({ startDate, endDate, setStartDate, setEndDate }) {

    return (
        <div className={styles.date_range_picker}>
            <div className={styles.date_picker}>
                <label htmlFor="fromDate">From date:</label>
                <input
                    type="date"
                    name="fromDate"
                    id="fromDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} 
                />
            </div>
            <span> to </span>
            <div className={styles.date_picker}>
                <label htmlFor="toDate">To date:</label>
                <input
                    type="date"
                    name="toDate"
                    id="toDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} 
                />
            </div>
        </div>
    )
}

export default DatePicker