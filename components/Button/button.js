import Link from "next/link"

function Button({ title, action = false, className, href = false }) {
  return (
    <>
      {!href ? (
        <button className={`bg-blue-1 text-white p-2 rounded hover:bg-blue-2 hover:filter hover:drop-shadow-xl m-2 ${className}`} onClick={() => action !== false && action()}>{title}</button>

      ) : (
        <Link href={href}>
          <a className="flex text-white border-2 rounded-lg h-full px-4">
            <span className="m-auto">
              {title}
            </span>
          </a>
        </Link>
      )}
    </>
  )
}

export default Button