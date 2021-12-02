// scrub PII from user input before sending to Watson Assistant

function presendHandler(obj) {
  var userInput = obj.data.input.text.toLowerCase()
  
 // e-mail address regular expression
 emailReg = /([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})/g

 // social security number w/ dashes regular expression
 ssndReg = /[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}/g

 // social security number regular expression
 ssnReg = /(\d{9})/g

 // phone number regular expression
 phoneReg = /([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4})/g
 
 // m(m)/d(d)/y(y)
 dobSlash = /\d{1,2}\/\d{1,2}\/\d{2,4}/g

 // m(m)-d(d)-y(y)
 dobDash = /\d{1,2}\-\d{1,2}\-\d{2,4}/g

 // MM(MM) d(d) y(y) 
 dobLong = /(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{1,2}),?\s+(\d{0,4})/g

 // m(m) d(d) y(y)
 dobDigitswSpace = /(\d{1,2})?\s+(\d{1,2})\s+(\d{2,4})/g

 // Any number between 6 and 8 digits. 
 dobDigitsOnly = /[0-9]{6,8}/g
 
 myNameIs = /my\sname\sis\s.*/g

  userInput = userInput.replace(emailReg, 'REDACTED').replace(ssndReg, 'REDACTED').replace(ssnReg, 'REDACTED').replace(phoneReg, 'REDACTED').replace(dobSlash,'REDACTED').replace(dobDash,'REDACTED').replace(dobLong,'REDACTED').replace(dobDigitswSpace,'REDACTED').replace(dobDigitsOnly,'REDACTED').replace(myNameIs,'my name is REDACTED')
  obj.data.input.text = userInput
}

window.watsonAssistantChatOptions = {
    integrationID: "{your-integ-id}",
    region: "{us-south, dc, etc.}",
    onLoad: function(instance) { 
      instance.on({ type: "pre:send", handler: presendHandler});
      instance.render(); 
    }
};
