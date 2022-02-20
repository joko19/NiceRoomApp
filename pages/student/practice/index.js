import CardPractice from "../../../components/Cards/CardPractice"
import Layout from "../../../Layout/Layout"

export default function Index() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="mt-12">
      <p className="font-bold text-xl">Practice Test </p>
      <div className="flex flex-wrap">
        {list.map((item) => (
          <CardPractice key={item} />
        ))}
      </div>
    </div>
  )
}


Index.layout = Layout