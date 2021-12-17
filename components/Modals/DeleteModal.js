import React, {useState, useCallback, useEffect} from 'react'
import { FiImage, FiLoader, FiUpload } from 'react-icons/fi';

export default function DeleteModal({selectedData = null, onDelete = null, parent = null, title = '', subtitle = '', endpoint = ''}) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageSelected, setImageSelected] = useState('')

  const doDelete = useCallback(() => {
    setIsLoading(true)
    a
    fetch(`${process.env.baseUrl}${endpoint}/${selectedData.id}`, {
        method: 'DELETE', 
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
        }
      })
      .then(async resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(await resp.json());
        }
      })
      .then((result) => {
        setIsLoading(false)
        if (result.status) {
          onDelete(result)
        }
      })
      .catch((err) => {
        setIsLoading(false)
        onDelete({status: false, message: 'Gagal menambahkan kategori'})
      });
  }, [])

  const onDeleteClicked = data => {
    if(window !== undefined) {
      doDelete()
    }
  };

  return (
    <div className="px-5 pb-5 w-full flex flex-col space-y-5">
      <span className="text-lg font-medium text-center mb-2">{title}</span>
      <span className="text-md text-center">{subtitle}</span>
      <div className="flex justify-center">
        <button className="btn btn-none" disabled={isLoading} onClick={e => {
          e.preventDefault()
          parent.current.close()
        }}>
          Batal
        </button>
        <button className="btn btn-md btn-danger flex items-center justify-center space-x-2" disabled={isLoading} onClick={onDeleteClicked}>
          {isLoading ? <FiLoader className="animate-spin" size={16} /> : <></>}
          <span>Yakin</span>
        </button>
      </div>
    </div>
  )
}