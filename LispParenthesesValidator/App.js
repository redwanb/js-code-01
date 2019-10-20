function LispParenthesesValidator(fileContent) {

  this.isBalanced = function () {
    var stack = [];
    const opener = "(";
    const closer = ")";

    // in LISP a minimum of one balanced parantheses pair is required
    var onePairOfParenthesesSeen = false;

    for (var i = 0; i < fileContent.length; i++) {
      var aChar = fileContent[i];

      if (aChar == closer && stack.length == 0) {
        return false;
      }

      if (aChar == opener) {
        stack.push(aChar);
      }

      if (aChar == closer) {
        var lastPush = stack.pop();
        if (lastPush == opener) {
          onePairOfParenthesesSeen = true;
        }
      }
    }

    // if the stack is empty and the minimum LISP parantheses
    // requirement is satisfied, return true
    return (stack.length == 0 && onePairOfParenthesesSeen);
  }
}

var lpv1 = new LispParenthesesValidator("test");
var result = lpv1.isBalanced();

console.log(result)