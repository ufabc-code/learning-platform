import { createContext, ReactNode, useContext, useState } from 'react'
import {
  ArrowPathIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

interface Notification {
  _id?: number
  icon?: {
    color: string
    background: string
    svg: ReactNode
  }
  message: string
}

interface ToastProviderProps {
  children: ReactNode
}

interface ToastContextData {
  notifications: Notification[]
  addToast: ({ icon, message }: Notification) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

export function ToastProvider({ children }: ToastProviderProps) {
  const [id, setId] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([])

  function addToast({ icon, message }: Notification) {
    const _id = id + 1
    setId(_id)
    setNotifications([...notifications, { icon, message, _id }])
    setTimeout(() => {
      removeToast(_id)
    }, 2000)
  }

  function removeToast(id: number) {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification._id !== id),
    )
  }

  return (
    <ToastContext.Provider
      value={{
        notifications,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const icons = {
  success: {
    color: 'text-green-500',
    background: 'bg-green-100',
    svg: <CheckCircleIcon className="h-7 w-7" />,
  },
  loading: {
    color: 'text-sky-500',
    background: 'bg-sky-100',
    svg: <ArrowPathIcon className="h-7 w-7" />,
  },
}

interface ToastProps {
  icon?: {
    color: string
    background: string
    svg: ReactNode
  }
  message: string
  handleCloseToast: () => void
}

function Toast({ icon, message, handleCloseToast }: ToastProps) {
  return (
    <div className="flex w-80 items-center rounded-lg border bg-white p-4 text-gray-500 shadow-xl">
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          icon?.background || ''
        } ${icon?.color || ''}`}
      >
        {icon?.svg}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        onClick={handleCloseToast}
        type="button"
        className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-center text-gray-400 hover:bg-gray-100 hover:text-gray-900"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  )
}

export function ToastSection() {
  const { notifications, removeToast } = useToast()

  function handleCloseToast(id: number) {
    removeToast(id)
  }

  function reverseArray<T>(array: T[]) {
    const reversedArray = [...array]
    return reversedArray.reverse()
  }

  return (
    <div className="sticky top-0 right-0 flex justify-end bg-red-300">
      <div className="absolute z-10 grid grid-cols-1 gap-4 p-8">
        {reverseArray(notifications).map(({ icon, message, _id }, index) => (
          <Toast
            key={index}
            message={message}
            icon={icon}
            handleCloseToast={() => _id && handleCloseToast(_id)}
          />
        ))}
      </div>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  return context
}
