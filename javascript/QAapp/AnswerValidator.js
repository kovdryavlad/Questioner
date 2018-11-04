'use strict';

const WithCorrectValuesValidationService = require("./ValidationServices/WithCorrectValuesValidationService.js");
const StringTypeValidationService = require("./ValidationServices/StringTypeValidationService.js");
const NumberTypeValidationService = require("./ValidationServices/NumberTypeValidationService.js");
const WithoutAnswerValidationService = require("./ValidationServices/WithoutAnswerValidationService.js");

class AnswerValidator{

    validate(answer, validationRules, onSuccess, onError){

        for(let validationRule of validationRules){

            let [isValid, customError] = this.isValid(answer, validationRule);

            if(!isValid){
                if(customError !== undefined){
                    onError(customError);
                }else{
                    onError(validationRule.error);
                }
                
                return;
            }
        }

        onSuccess();
    }

    isValid(answer, rule){
        
        let validationService;
            
        switch(rule.type){

            case "WithCorrectValues":
                validationService = new WithCorrectValuesValidationService();
                break;

            case "StringType":
                validationService = new StringTypeValidationService();
                break;
                
            case "NumberType":
                validationService = new NumberTypeValidationService();
                break;

            case "WithoutAnswer":
                validationService = new WithoutAnswerValidationService();
                break;

        }

        let validationResult = validationService.isValid(answer, rule);
        
        return this.processValidationResult(validationResult);

    }

    processValidationResult(validationResult){
        
        if(Array.isArray(validationResult)){
            return validationResult;
        }
        else{
            return [validationResult];
        }
    }
}

module.exports = AnswerValidator;