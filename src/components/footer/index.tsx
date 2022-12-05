const Footer = () => {
  return (
    <footer className="border-t border-gray-300">
      <div className="flex w-full justify-between p-6">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2022{' '}
          <a
            href="http://grub.academy/"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:underline"
          >
            GRUB Learning Platform
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
