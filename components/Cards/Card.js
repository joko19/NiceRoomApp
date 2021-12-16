import React from "react";

export default function Card({children, className = '', title = '', subtitle = '', props = null, right = null}) {
  return (
    <div className={`bg-white flex flex-col p-5 ${className}`} {...props}>
      {title || subtitle || right ? (
        <div className="flex flex-row justify-between mb-8">
          <div className="flex flex-col">
            <span className="font-semibold text-2xl">{title}</span>
            <span className="text-gray-chateau-500">{subtitle}</span>
          </div>
          <div>
            {right}
          </div>
        </div>
      ) : ''}
      {children}
    </div>
  )
}