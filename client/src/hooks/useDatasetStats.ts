import { useCallback, useEffect, useState } from 'react'
import { getProductStats, seedProducts, getApiErrorMessage } from '@/services'
import { SEED_DATASET_TARGET } from '@/constants'

interface DatasetState {
  totalProducts: number | null
  isLoadingStats: boolean
  statsUnavailable: boolean
  isSeeding: boolean
  seedError: string | null
}

export function useDatasetStats() {
  const [state, setState] = useState<DatasetState>({
    totalProducts: null,
    isLoadingStats: true,
    statsUnavailable: false,
    isSeeding: false,
    seedError: null,
  })

  const refreshStats = useCallback(async () => {
    setState((previous) => ({ ...previous, isLoadingStats: true }))
    try {
      const response = await getProductStats()
      setState((previous) => ({
        ...previous,
        totalProducts: response.data.totalProducts,
        isLoadingStats: false,
        statsUnavailable: false,
      }))
    } catch {
      // The stats endpoint isn't part of the documented backend contract.
      setState((previous) => ({ ...previous, isLoadingStats: false, statsUnavailable: true }))
    }
  }, [])

  useEffect(() => {
    void refreshStats()
  }, [refreshStats])

  const runSeed = useCallback(async (): Promise<{ ok: boolean; message: string }> => {
    setState((previous) => ({ ...previous, isSeeding: true, seedError: null }))
    try {
      const response = await seedProducts()
      setState((previous) => ({ ...previous, isSeeding: false }))
      await refreshStats()
      return { ok: true, message: response.message ?? 'Dataset generated.' }
    } catch (error) {
      const message = getApiErrorMessage(error, 'Could not reach the seed endpoint.')
      setState((previous) => ({ ...previous, isSeeding: false, seedError: message }))
      return { ok: false, message }
    }
  }, [refreshStats])

  const isAtTarget = (state.totalProducts ?? 0) >= SEED_DATASET_TARGET

  return { ...state, isAtTarget, refreshStats, runSeed }
}
