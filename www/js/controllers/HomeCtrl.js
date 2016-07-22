paperWalletBalance.controller('HomeCtrl', function($scope, $cordovaBarcodeScanner, $ionicPlatform, $http) {

  $scope.totalBTC = 0;
  $scope.totalUSD = 0;
  $scope.totalBRL = 0;
  $scope.qrCode = '';

  $ionicPlatform.ready(function() {
    $scope.scan = function() {
      $scope.scanResult = '';
      $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        //$scope.scanResult = barcodeData.text;

        if (barcodeData.text && barcodeData.text[0] == '1') {
          $scope.qrCode = barcodeData.text;
          $http.get('https://blockchain.info/q/addressbalance/'+barcodeData.text+'?confirmations=6', {}).then(function(response) {
            $scope.totalBTC = (Number(response.data)/100000000);
            $scope.totalBTCText = $scope.totalBTC + ' bitcoins';

             $http.get('https://www.bitstamp.net/api/ticker/', {}).then(function(response) {
              var obj = angular.fromJson(response.data);
              $scope.totalUSD = obj.last * $scope.totalBTC;
              $scope.totalUSD = $scope.totalUSD.formatMoney(2, '.', ',');
              $scope.totalUSDText = 'US$ ' + $scope.totalUSD;
             }, function(response) {
              $scope.totalUSDText = 'There is an error to get your USD balance.';
             });

             $http.get('https://api.blinktrade.com/api/v1/BRL/ticker?crypto_currency=BTC', {}).then(function(response) {
              var obj = angular.fromJson(response.data);
              $scope.totalBRL = obj.last * $scope.totalBTC;
              $scope.totalBRL = $scope.totalBRL.formatMoney();
              $scope.totalBRLText = 'R$ ' + $scope.totalBRL;
             }, function(response) {
              $scope.totalBRLText = 'There is an error to get your BRL balance.';
             });          

          }, function() {
            $scope.totalBTCText = 'There is an error to get your wallet balance.';
          });
        } else {
          $scope.qrCode = '';
          $scope.totalBTCText = '';
          $scope.totalUSDText = '';
          $scope.totalBRLText = '';
        }
      }, function(error) {
        console.log(error);
      });  
    }
  });
});