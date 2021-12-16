import Card from "../../components/Cards/Card";
import { HeaderDataTable, PaginationDataTable, EmptyDataTable } from "../../components/Datatables/CustomDataTable";
import Admin from "../../Layout/Admin";

export default function Index(props) {
  return (
    <>
      <Card
        className="md:mt-16 w-full  bg-white"
        title="Home" >
        <h1>Hello world</h1>
      </Card>
    </>
  )
}
Index.layout = Admin