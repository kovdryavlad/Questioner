'use strict';

class WithCorrectValuesValidationService{
    
    isValid(answer, validationRule){
        const isCaseSensitive = validationRule.isCaseSensitive || false;

        if(isCaseSensitive){
            return validationRule.correctAnswers.includes(answer);
        } else{
            let correctValuesInLowRegister = validationRule.correctAnswers.map(str=>str.toUpperCase());
            return correctValuesInLowRegister.includes(answer.toUpperCase());
        }

    }
}

module.exports = WithCorrectValuesValidationService;