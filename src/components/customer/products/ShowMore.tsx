import { Button } from '@/components/ui/button'
import Link from 'next/link'


const ShowMore = () => {
    const loadNextPage = () => {

    }

  return (
    <Button
                            asChild
                            className="mt-8 py-6 font-semibold text-base"
                        >
                            <Link href="/checkout">Show More</Link>
                        </Button>
  )
}

export default ShowMore