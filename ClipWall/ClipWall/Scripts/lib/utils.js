define(["require", "exports"], function(require, exports) {
    var Test = (function () {
        function Test(Name) {
            this.Name = Name;
        }
        Test.prototype.isValid = function (str) {
            return true;
        };
        return Test;
    })();
    exports.Test = Test;
});
