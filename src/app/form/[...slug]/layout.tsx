import styles from './layout.module.scss';



export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.questionLayout}>
      <section>
        { children }
      </section>
    </div>
  )
}
