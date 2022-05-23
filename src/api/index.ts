import request from '@/utils/requestApi'

export const getWinnerAwardRequest = async (body: { address: string; hold_address: string }) =>
  request({
    url: '/winner_award',
    method: 'post',
    data: body,
  })

export const getArticipationAwardRequest = async (body: { address: string; email: string; did: string }) =>
  request({
    url: '/articipation_award',
    method: 'post',
    data: body,
  })
