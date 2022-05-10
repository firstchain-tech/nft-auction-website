import { useContext } from 'react'
import type { ConstantInitTypes } from '@/contracts/constantInit'
import { Context } from '@/components/Web3Provider'

const useDataHooks = () => {
  const { data }: { data: ConstantInitTypes } = useContext<any>(Context)
  return data
}

export default useDataHooks
