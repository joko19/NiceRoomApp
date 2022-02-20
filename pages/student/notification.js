import Card from "../../components/Cards/Card"
import Layout from "../../Layout/Layout"
import Button from "../../components/Button/button"
import Image from "next/image"

export default function Notification() {
  return (
    <div className="mt-12">
      <Card title="Notification" right={(
        <div >
          <Button title="Mark All as Read" />
        </div>
      )}>
        <div className="flex border rounded-lg p-4 gap-4 my-2">
          <img src="/asset/icon/ic_quiz.png" className="h-12 w-12" alt="icon" />
          <div className="my-auto">
            <h1 className="font-bold">Lorem Ipsum dolor sit amet</h1>
            <p>7 hours ago</p>
          </div>
        </div>
        <div className="flex border rounded-lg p-4 gap-4 my-2">
          <img src="/asset/icon/ic_quiz.png" className="h-12 w-12" alt="icon" />
          <div className="my-auto">
            <h1 className="font-bold">Lorem Ipsum dolor sit amet</h1>
            <p>7 hours ago</p>
          </div>
        </div>
      </Card>
    </div>
  )
}


Notification.layout = Layout