(function () {
  console.log('Did initialize module');
  module.exports = {
      show: function () {
        console.log('Did open show')
        cordova.exec(null, null, 'HelloWorld', 'show', []);
      }
  };
})();
