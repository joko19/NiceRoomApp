import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../components/Cards/Card";
import Admin from "../../../Layout/Admin";

export default function Create(props) {
  return (
    <div className="md:py-12">
      <Link href="/admin/institution">
        <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
      </Link>
      <Card
        className="md:mt-8 w-full  bg-white"
        title="Create News" >
        <form>
          <p>News Title</p>
          
          <input type="text" className="border w-full rounded p-4" placeholder="Input News Title" />
          <p className="mt-4">Sub-Title</p>
          <input type="text" className="border w-full rounded p-4" placeholder="Input News Sub-Title" />
          <p className="mt-4">Description</p>
          <p>Tags</p>
          <div className="flex flex-row-reverse">
            <button className="bg-blue-1 text-white p-4 rounded-lg">Post News</button>
          </div>
        </form>
      </Card>
    </div>
  )
}

Create.layout = Admin