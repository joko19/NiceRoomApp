import Card from "../../components/Cards/Card";
import Admin from "../../Layout/Admin";

export default function Index(props) {
  return (
    <div className="bg-blue-100 w-full">
      <Card
        className="md:mt-16 w-full  bg-white"
        title="Home" >
        <h1>Hello world</h1>
      </Card>
    </div>
  )
}
Index.layout = Admin