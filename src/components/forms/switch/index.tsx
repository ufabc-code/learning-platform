import { useState, FC } from 'react'

type SwitchProps =  { onChangeChecked: (isChecked: boolean) => void}

const Switch: FC<SwitchProps> = ({onChangeChecked}) => {
  const [isChecked, setIsChecked] = useState(false)
  const handleIsChecked = () => {
    setIsChecked(!isChecked)
    onChangeChecked(!isChecked)
  }
  console.log("COMPONENETE FILHO ",isChecked)
  
  return (
  <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
    <input type="checkbox" value="" id="default-toggle" className="sr-only peer" onClick={handleIsChecked} checked={isChecked}/>
    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
  </label>
  )
} 

export default Switch