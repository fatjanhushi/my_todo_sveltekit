export function get({ request }) {
	return {
		status: 303,
		headers: {
			location: '/auth/login',
		},
	}
}
