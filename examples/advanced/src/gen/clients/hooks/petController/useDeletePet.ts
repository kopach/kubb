import client from '../../../../tanstack-query-client.ts'
import { useMutation } from '@tanstack/react-query'
import type { DeletePetMutationResponse, DeletePetPathParams, DeletePetHeaderParams, DeletePet400 } from '../../../models/ts/petController/DeletePet'
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query'

type DeletePetClient = typeof client<DeletePetMutationResponse, DeletePet400, never>
type DeletePet = {
  data: DeletePetMutationResponse
  error: DeletePet400
  request: never
  pathParams: DeletePetPathParams
  queryParams: never
  headerParams: DeletePetHeaderParams
  response: Awaited<ReturnType<DeletePetClient>>
  client: {
    parameters: Partial<Parameters<DeletePetClient>[0]>
    return: Awaited<ReturnType<DeletePetClient>>
  }
}
/**
 * @description delete a pet
 * @summary Deletes a pet
 * @link /pet/:petId */
export function useDeletePet(options: {
  mutation?: UseMutationOptions<DeletePet['response'], DeletePet['error'], {
    petId: DeletePetPathParams['petId']
    headers?: DeletePet['headerParams']
  }>
  client?: DeletePet['client']['parameters']
} = {}): UseMutationResult<DeletePet['response'], DeletePet['error'], {
  petId: DeletePetPathParams['petId']
  headers?: DeletePet['headerParams']
}> {
  const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {}
  return useMutation<DeletePet['response'], DeletePet['error'], {
    petId: DeletePetPathParams['petId']
    headers?: DeletePet['headerParams']
  }>({
    mutationFn: async ({ petId, headers }) => {
      const res = await client<DeletePet['data'], DeletePet['error'], DeletePet['request']>({
        method: 'delete',
        url: `/pet/${petId}`,
        headers: { ...headers, ...clientOptions.headers },
        ...clientOptions,
      })
      return res
    },
    ...mutationOptions,
  })
}
