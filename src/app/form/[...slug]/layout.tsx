import styles from './styles.module.css';


export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.questionLayout}>
      <div className={styles.questionContainer}>
        { children }
      </div>
    </div>
  )
}
