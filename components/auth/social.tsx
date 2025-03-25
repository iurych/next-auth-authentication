'use client'

import { FaGithub } from '@/@node_modules/react-icons/fa'
import { FcGoogle } from '@/@node_modules/react-icons/fc'
import { Button } from '../ui/button'

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
