import { useState, FC, InputHTMLAttributes } from 'react'

type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  onChangeChecked: (isChecked: boolean, id: string) => void
}

const Switch: FC<SwitchProps> = ({ onChangeChecked, ...inputProps }) => {
  const [isChecked, setIsChecked] = useState(false)
  const handleIsChecked = () => {
    setIsChecked(!isChecked)
    inputProps.id && onChangeChecked(!isChecked, inputProps.id)
  }

  return (
    <label
      htmlFor={inputProps.id}
      className="relative inline-flex cursor-pointer items-center"
    >
      <input
        type="checkbox"
        className="peer sr-only"
        onChange={handleIsChecked}
        checked={isChecked}
        {...inputProps}
      />
      <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
    </label>
  )
}

export default Switch
