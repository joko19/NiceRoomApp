import { useState, useEffect } from "react";
import Card from "../../components/Cards/Card"
import Layout from "../../Layout/Layout"
import Button from "../../components/Button/button"
import apiStudentPage from "../../action/student_page"
import Pagination from "../../components/Pagination/pagination";

export default function Notification() {
  const [notificationData, setNotificationData] = useState([])
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [render, setRender] = useState(false)
  const [notif, setNotif] = useState([])
  useEffect(() => {
    const getData = async () => {
      await apiStudentPage.notification(limit, page)
        .then((res) => {
          console.log("hello world")
          console.log(res.data.data)
          setNotif(res.data.data)
          setNotificationData(res.data.data.data)
        })
    }
    getData()
  }, [limit, page, render])

  const onReadAll = async () => {
    await apiStudentPage.notificationRead()
      .then(() => setRender(!render))
  }

  return (
    <div className="mt-12">
      <Card title="Notification" right={(
        <div onClick={() => onReadAll()}>
          <Button title="Mark All as Read" />
        </div>
      )}>
        {notificationData.map((item, index) => (
          <div className={`${item.read_at === null ? 'bg-black-7' : 'bg-white'} flex border rounded-lg p-4 gap-4 my-2`}>
            <img src="/asset/icon/ic_quiz.png" className="h-12 w-12" alt="icon" />
            <div className="my-auto">
              <h1 className="font-bold">{item.data.announcement_title}</h1>
              <p>7 hours ago</p>
            </div>
          </div>
        ))}
        <Pagination page={page} lastPage={notif.last_page} limit={limit} total={notif.total} doLimit={data => setLimit(data)} doPage={data => {
          setPage(data)
          console.log(data)
        }} />
      </Card>
    </div>
  )
}


Notification.layout = Layout