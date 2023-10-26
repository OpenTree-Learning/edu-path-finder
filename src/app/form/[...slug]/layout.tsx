import ProgressBar from 'lib/components/progress_bar/progress_bar';
import styles from './layout.module.scss';



export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.questionLayout}>
      <div className={styles.progressBarLayout}>
        <ProgressBar/>
      </div>
      <section>
        { children }
      </section>
    </div>
  )
}
