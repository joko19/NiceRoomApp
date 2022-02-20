import Layout from "../../../Layout/Layout"
import CardNews from "../../../components/Cards/CardNews"

export default function Index() {
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="mt-12 ">
      <h1 className="text-xl font-bold mb-4">All News</h1>
      {dummy.map((item) => (
        <CardNews key={item} idNews={item} />
      ))}
    </div>
  )
}

Index.layout = Layout