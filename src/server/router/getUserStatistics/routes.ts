import { getUserStatisticsFactory } from 'server/modules/getUserStatistics/getUserStatisticsFactory'
import { createRouter } from '../context'

export const userStatistics = createRouter().query('get', {
  resolve: async ({ ctx }) => {
    const { user } = ctx
    return await getUserStatisticsFactory().execute({ user })
  },
})
