import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";


function Pagination({page, lastPage, total, limit, search, doLimit, doData}) {
  return (

    <div className="flex mt-8 flex-row-reverse flex-end gap-4">
      <button className={`${page !== lastPage ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`} onClick={() => {
        if (page !== lastPage) {
          doData(search, limit, lastPage)
        }
      }}>
        <FaAngleDoubleRight />
      </button>
      <button className={`${page < lastPage ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`} onClick={() => {
        if (page < lastPage) {
          doData(search, limit, page + 1)
        }
      }}>
        <FaAngleRight />
      </button>
      <button className={`${page > 1 ? 'bg-black-6' : 'cursor-default'} p-1  rounded-full align-middle`} onClick={() => {
        if (page > 1) {
          doData(search, limit, page - 1)
        }
      }}>
        <FaAngleLeft />
      </button>
      <button className={`${page !== 1 ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`} onClick={() => {
        if (page !== 1) {
          doData(search, limit, 1)
        }
      }}>
        <FaAngleDoubleLeft />
      </button>
      <span> {page < lastPage ? page : lastPage} - {lastPage} from {total}</span>
      <select className="bg-white" value={limit} onChange={(e) => {
        doLimit(e.target.value)
        doData(search, e.target.value,page)
      }}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <span>Data per page : </span>
    </div>
  )
}

export default Pagination