'use strict';

class NumberTypeValidationService{

    isValid(answer, validationRule){

        if(+answer<validationRule.minBorder){
            return [false, validationRule.minError]; 
        }

        else if(+answer>validationRule.maxBorder){
            return [false, validationRule.maxError];
        }
        
        else {
            return true;
        }
    }
}

module.exports = NumberTypeValidationService;