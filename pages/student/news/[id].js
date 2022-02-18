import Layout from "../../../Layout/Layout"
import Link from "next/link"
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../components/Cards/Card";
import CardNews from "../../../components/Cards/CardNews";

export default function ReadNews() {
  const dummy = [1, 2, 3]
  return (
    <div className="mt-12 ">
      <Link href="/student/news">
        <a className="flex gap-4 text-blue-1 mb-4 hover:text-blue-2">
          <FaAngleLeft className="my-auto" />
          <span>Back To All News</span>
        </a>
      </Link>
      <Card title="Teachies Cide For A Better Future" >
        <div className="flex gap-4 mb-4">
          <span className="text-blue-1 font-bold" >By Nur Fauzi</span>
          <span>Updated Juli 8th, 2021</span>
        </div>
        <img src="/asset/img/coverNews.png" className="" />
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae feugiat nunc, sit amet facilisis tortor. Suspendisse consectetur id lectus ut condimentum. Aenean odio massa, euismod quis tempus nec, tristique et nibh. Sed tempor sed sem et ullamcorper. Sed ornare urna eget erat porttitor scelerisque. Maecenas enim diam, finibus nec turpis at, fringilla vulputate tortor. Donec aliquam nec est ac congue. Ut vel rutrum nulla, et hendrerit lectus. Vestibulum turpis sapien, rhoncus non faucibus sed, condimentum nec mi. Etiam tempor posuere lacinia. Sed vulputate placerat purus, eget convallis urna aliquet consequat. Nulla in imperdiet nisi. Nam purus risus, efficitur id nunc a, finibus semper justo.

          Sed in malesuada quam, ultrices ullamcorper purus. Pellentesque placerat vitae urna non posuere. In molestie mi nec venenatis gravida. Fusce lectus erat, rutrum ut massa a, laoreet maximus orci. Fusce finibus aliquet enim. In congue quam magna, quis condimentum arcu facilisis at. Vestibulum lacinia consequat sem, ac scelerisque orci iaculis sed. Praesent in lectus accumsan, eleifend urna eget, cursus ipsum. Fusce aliquet vitae mi interdum porttitor. Cras scelerisque ultricies venenatis. Nullam nec rhoncus enim. Nunc ut ex pellentesque, mollis sem eget, maximus mauris.

          Morbi a aliquam est. Nam sit amet facilisis urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent ultrices velit vel justo congue, nec suscipit nisi blandit. Ut id sagittis velit, et porta libero. Aenean quis mollis magna. Cras et faucibus quam, ac aliquet ex. Cras in erat hendrerit, elementum nunc eu, tincidunt dolor.

          Sed ac nisi sit amet mi viverra porta. Maecenas imperdiet massa felis, at convallis arcu porttitor vitae. Maecenas porta dictum metus nec pharetra. Mauris at convallis nisi, vitae luctus diam. Praesent ornare, elit ac commodo rhoncus, nisi ligula accumsan leo, et pulvinar sem purus scelerisque leo. Vestibulum euismod risus sit amet luctus pretium. Proin tincidunt eu felis vitae aliquam. Nulla in elit eget tellus condimentum pharetra. Pellentesque justo mi, fermentum malesuada diam a, porttitor faucibus purus. Integer accumsan ornare nunc vel ullamcorper. Mauris efficitur, augue a porttitor cursus, libero lacus hendrerit libero, non vestibulum libero lectus ut nibh. In pulvinar lorem at leo tempor, vitae interdum elit aliquet. Donec eget consectetur elit, ac iaculis magna. Etiam eget sollicitudin libero. Morbi consectetur ullamcorper dolor, in facilisis augue tristique at.

          Morbi tincidunt venenatis velit eget egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit nisl quis blandit venenatis. Duis semper dui nec velit mollis, et luctus leo vulputate. Nulla facilisi. Mauris eget volutpat nunc. Fusce elementum blandit magna, et venenatis neque blandit id. Phasellus in blandit massa.
        </p>
        <p className="mt-4 font-bold">Tags</p>
        <div className="flex gap-2 mt-2">
          <div className="text-blue-1 p-2 rounded bg-blue-6 inline-block">Coding</div>
          <div className="text-blue-1 p-2 rounded bg-blue-6 inline-block">New Education Policy</div>
        </div>
        <p className="mt-4 font-bold">Featured News</p>
        <CardNews />
      </Card>
    </div>
  )
}

ReadNews.layout = Layout