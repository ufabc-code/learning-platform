import Container from 'components/container'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'flowbite-react'

const Home: NextPage = () => {
  return (
    <div className="h-full pt-12">
      <Container>
        <section>
          <div className="flex justify-center">
            <Image
              src="/undraw_programmer_re_owql.svg"
              width="500"
              height="500"
              alt="Pessoa programando"
            />
          </div>

          <div className="mx-auto w-2/3 py-8 text-center">
            <h2 className="text-4xl font-bold">
              Aprenda <span className="text-flowbite-blue">programação</span>{' '}
              utilizando metodos de repetição{' '}
              <span className="text-flowbite-blue">
                cientificamente comprovados
              </span>
            </h2>
            <div className="mx-auto mt-8 w-fit px-2">
              <Link href="/student" passHref>
                <Button>Começar Agora</Button>
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default Home
