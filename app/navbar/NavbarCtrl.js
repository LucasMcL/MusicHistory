let NavbarCtrl = app.controller('NavbarCtrl', function($scope, $location) {
	console.log('NavbarCtrl instantiated')

	$scope.notOnLoginOrRegister = function() {
		// Returns true if the user is not on the login or register page
		return ($location.path() !== '/login' && $location.path() !== '/register')
	}
})

NavbarCtrl.resolve = {
	user: (AuthFactory) => {
		return AuthFactory.getUser()
	}
}
