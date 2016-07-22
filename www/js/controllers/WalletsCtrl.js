paperWalletBalance.controller('WalletsCtrl', function($scope, $cordovaBarcodeScanner){

	$scope.wallets = [];

	$scope.init = function() {

		if (!window.localStorage.getItem('wallets')) {
			window.localStorage.setItem('wallets', JSON.stringify([]));
		}

		$scope.wallets = JSON.parse(window.localStorage.getItem('wallets'));

	}

	$scope.scan = function() {
		$scope.addAddress('1Ae6UUQWRXKxy7QLzkNK1qsLddWjCm9yDF');
		return;
		var scanResult = '';
		$cordovaBarcodeScanner.scan().then(function(barcodeData) {

			if (barcodeData.text && barcodeData.text[0] == '1') {
				$scope.addAddress(barcodeData.text);
			}
		});
	}

	$scope.addAddress = function(address) {
		$scope.wallets.push({address: address});
		$scope.updateLocalStorage();
	};

	$scope.refresh = function() {
		console.log('refresh');
	}

	$scope.updateLocalStorage = function() {
		window.localStorage.setItem('wallets', JSON.stringify($scope.wallets));
	}

	$scope.resetLocalStorage = function() {
		window.localStorage.setItem('wallets', JSON.stringify([]));
	}

	$scope.init();

});