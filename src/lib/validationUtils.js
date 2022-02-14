export const validEmail = (email) => {
	if (!email) return false
	const re =
		/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
	return re.test(email)
}

export const validName = (name) => {
	if (!name) return false
	if (name.length < 3) return false
	if (name.length > 35) return false
	return true
}

export const validPassword = (password) => {
	if (!password) return false
	if (password.length < 8) return false
	return true
}

// Check all inputs
// return FALSE if any input is NOT valid
// DefaultValidName is default parameter to use this same function for the login page
// that name is not required
export const validAll = (email, password, name = 'DefaultValidName') => {
	if (!validEmail(email) || !validName(name) || !validPassword(password)) {
		return false
	}
	return true
}
