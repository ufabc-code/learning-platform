import { useEffect, useState } from 'react'

interface TabsProps {
  active: number
  tabs: Array<{
    children: React.ReactNode
    name: string
  }>
}

function Tabs({ tabs, active }: TabsProps) {
  const [activeTab, setActiveTab] = useState(active)

  useEffect(() => {
    setActiveTab(active)
  }, [active])

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 text-center text-sm font-medium text-gray-500">
        <div className="-mb-px flex flex-wrap">
          {tabs.map(({ name }, index) => (
            <button
              onClick={() => setActiveTab(index)}
              key={index}
              className={`mr-2 inline-block rounded-t-lg p-4 ${
                activeTab === index
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'hover:border-b-2 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      {tabs.map(({ children }, index) => (
        <div
          className="overflow-hidden"
          style={{
            height: `${index === activeTab ? 'auto' : '0px'}`,
          }}
          key={index}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export default Tabs
