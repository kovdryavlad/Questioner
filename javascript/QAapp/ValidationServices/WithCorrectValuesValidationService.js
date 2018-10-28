'use strict';

class WithCorrectValuesValidationService{

    isValid(answer, validationRule){
        
        return validationRule.correctAnswers.includes(answer);
    }
}

module.exports = WithCorrectValuesValidationService;