'use strict';

class StringTypeValidationService{

    isValid(answer, validationRule){

        if(answer === ""){
            return false;
        }

        const regExp = new RegExp(validationRule.regularExpression, "gi");
        const filteredAnswer = answer.match(regExp);
        
        if(filteredAnswer == null){
            return false;
        }
        
        else if(filteredAnswer.length == answer.length){
            return true;
        }

        else{
            return false;
        }
    }
}

module.exports = StringTypeValidationService;