export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="questionLayout">
      <div className="questionContainer">
        { children }
      </div>
    </div>
  )
}
