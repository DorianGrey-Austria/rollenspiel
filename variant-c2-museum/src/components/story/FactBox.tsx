// EDUCATIONAL FEATURE: Historical fact display
interface FactBoxProps {
  fact: string
}

export function FactBox({ fact }: FactBoxProps) {
  return (
    <div className="fact-box">
      <p className="font-body text-museum-navy">
        <strong>Historischer Kontext:</strong> {fact}
      </p>
    </div>
  )
}
