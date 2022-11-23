import { Footer as FlowbiteFooter } from 'flowbite-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white ">
      <div className="flex w-full justify-between p-6">
        <FlowbiteFooter.Copyright
          by="GRUB Learning Platform"
          href="#"
          year={2022}
          className="text-gray-50"
        />
        <FlowbiteFooter.LinkGroup className="text-gray-50">
          <FlowbiteFooter.Link href="#">About</FlowbiteFooter.Link>
        </FlowbiteFooter.LinkGroup>
      </div>
    </footer>
  )
}

export default Footer
