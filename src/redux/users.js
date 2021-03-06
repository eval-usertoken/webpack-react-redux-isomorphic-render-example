import { reduxModule } from 'react-website'

const redux = reduxModule('USERS');

export const getUsers = redux.action
(
	'GET_USERS',
	async ({ http }) =>
	{
		await delay(1000)
		const ids = await http.get('/api/example/users')
		return await Promise.all(ids.map(id => http.get(`/api/example/users/${id}`)))
	},
	{
		result: 'users'
	}
)

export const addUser = redux.action
(
	'ADD_USER',
	async ({ http }, user) =>
	{
		await delay(1500)
		await http.post(`/api/example/users`, user)
	}
)

export const deleteUser = redux.action
(
	'DELETE_USER',
	async ({ http }, id) =>
	{
		await delay(1000)
		await http.delete(`/api/example/users/${id}`)
	}
)

// // A developer can additionally handle any other custom events
// redux.on('CUSTOM_EVENT', (state, action) =>
// ({
//   ...state,
//   customProperty: action.result
// }))

// A little helper for Redux `@connect()`
export const properties = redux.getProperties

const initialState = { users: [] }

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default redux.reducer(initialState)

// "Sleep" using `Promise`
function delay(delay)
{
	return new Promise(resolve => setTimeout(resolve, delay))
}