module.exports = {
	user: (req, res, next) => {
		if (req.session.isAuthenticated){
			console.log("ATHKLSDJFH")
			next()
		} else {
			res.redirect(`/login?from=${req.baseUrl}`)
		}
	},

	attorney: (req, res, next) => {
		if (req.session.isAuthenticated && req.session.isAttorney){
			next()
		} else {
			res.redirect(`/login?from=${req.baseUrl}`)
		}
	},
}
