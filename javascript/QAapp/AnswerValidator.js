class AnswerValidator{

    validate(answer, validationRules, onSuccess, onError){

        let errorHappened;            
        let checkOnErrorValidateFunction = ((func, validationRule)=>{
            if(func(answer, validationRule, onError) == false){
                errorHappened = true;
            }
        });

        for(let validationRule of validationRules){
            
            errorHappened = false;
            const type = validationRule.type;
            
            switch(type){

                case "WithCorrectValues":
                    checkOnErrorValidateFunction(this.validate_WithCorrectValues, validationRule);
                    break;

                case "StringType":
                    checkOnErrorValidateFunction(this.validate_StringType, validationRule)
                    break;
                    
                case "NumberType":
                    checkOnErrorValidateFunction(this.validate_NumberType, validationRule);
                    break;

                case "WithoutAnswer":
                    checkOnErrorValidateFunction(this.validate_WithoutAnswer, validationRule);
                    break;

            }

            if(errorHappened)
                return;

        }

        onSuccess();
    }

    validate_WithCorrectValues(answer, validationRuleObj, onError){
        if(!validationRuleObj.correctAnswers.includes(answer)){
            onError(validationRuleObj.error);
            return false;
        }
    }

    validate_StringType(answer, validationRuleObj, onError){
        if(answer === ""){
            onError(validationRuleObj.error);
            return false;
        }

        const regExp = new RegExp(validationRuleObj.regularExpression, "gi");
        const filteredAnswer = answer.match(regExp);
        
        if(filteredAnswer == null){
            onError(validationRuleObj.error);
            return false;
        }
        
        else if(filteredAnswer.length == answer.length){
            return;
        }

        else{
            onError(validationRuleObj.error);
            return false;
        }
    }

    validate_NumberType(answer, validationRuleObj, onError){
        if(+answer<validationRuleObj.minBorder){
            onError(validationRuleObj.minError);
            return false; 
        }
        else if(+answer>validationRuleObj.maxBorder){
            onError(validationRuleObj.maxError);
            return false;
        }
    }

    validate_WithoutAnswer(answer, validationRuleObj, onError){
        onError(validationRuleObj.error);
		return false;
    }
}

module.exports = AnswerValidator;