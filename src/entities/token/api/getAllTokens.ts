import { $api } from 'shared/api'

export const getAllTokens = () => $api.get('/token/all')
