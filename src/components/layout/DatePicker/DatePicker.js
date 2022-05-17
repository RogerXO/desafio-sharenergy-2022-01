import styles from "./DatePicker.module.css"

import moment from 'moment'

function DatePicker({ startDate, endDate, setStartDate, setEndDate }) {
    const today = moment(new Date()).format('YYYY-MM-DD')

    return (
        <div className={styles.date_range_picker}>
            <div className={styles.date_picker}>
                <label htmlFor="fromDate">From date:</label>
                <input
                    type="date"
                    name="fromDate"
                    id="fromDate"
                    max={today}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className={styles.date_picker}>
                <label htmlFor="toDate">To date:</label>
                <input
                    type="date"
                    name="toDate"
                    id="toDate"
                    max={today}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button type="submit">Search</button>
        </div>
    )
}

export default DatePicker