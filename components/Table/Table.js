const Table = (props) => (
  <table className="table min-w-full divide-y divide-gray-200">
    <thead className="bg-black-9" >
      {props.head.map((item)=> (
      <th
        scope="col"
        className="px-6 py-3 text-left tracking-wider">
        {item}
      </th>
      ))}
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {props.content.map((item) => (
        <tr key={item.email}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="ml-4">
                <div>{item.name}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div>{item.state}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span>
              {item.city}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap ">{item.establishment_year}</td>
          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              <Image src="/asset/icon/table/fi_eye.png" width={16} height={16} alt="icon edit" />
            </a>
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
            </a>
            <button href="#" className="text-indigo-600 hover:text-indigo-900">
              <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon deleted" onClick={() => {
                setSelectedData(item.id)
                deleteModalRef.current.open()
              }} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default Table