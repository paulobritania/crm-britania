import map from 'lodash/map'

export const getAllAccesses = (state) => map(state.access.accesses, (option) => ({ id: option.id, description: option.name }))
