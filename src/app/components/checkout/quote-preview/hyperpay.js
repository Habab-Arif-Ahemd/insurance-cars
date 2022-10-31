var _resolve, _reject;
var promise = new Promise((resolve, reject) => { _resolve = resolve; _reject = reject; });
promise.resolve = _resolve;
promise.reject = _reject;

var hyperpayModule = (function() {

   return {
      paymentFormReady: function() {
         return promise;
      }
   }

})(hyperpayModule||{})
