// scrub PII from user input before sending to Watson Assistant

function presendHandler(obj) {
  var userInput = obj.data.input.text.toLowerCase()

  // e-mail address regular expression
  emailReg = "[a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6}"

  // social security number w/ dashes regular expression
  ssndReg = "^\d{3}-?\d{2}-?\d{4}$"

  // social security number regular expression
  ssnReg = "^\d{9}$"

  // phone number regular expression
  phoneReg = "^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$"
  
  // m(m)/d(d)/y(y)
  dobSlash = "^\d{1,2}\/\d{1,2}\/\d{2,4}$"

  // m(m)-d(d)-y(y)
  dobDash = "^\d{1,2}\-\d{1,2}\-\d{2,4}$"

  // MM(MM) d(d) y(y) 
  dobLong = "(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),?\s+(\d{0,4})"

  // m(m) d(d) y(y)
  dobDigitswSpace = "(\d{1,2})?\s+(\d{1,2})\s+(\d{2,4})"

  // Any number between 6 and 8 digits. 
  dobDigitsOnly = "^[0-9]{6,8}$"
  
  myNameIs = "My\sname\sis\s.*"

  userInput = userInput.replace(emailReg, 'REDACTED').replace(ssndReg, 'REDACTED').replace(ssnReg, 'REDACTED').replace(phoneReg, 'REDACTED').replace(dobSlash,'REDACTED').replace(dobDash,'REDACTED').replace(dobLong,'REDACTED').replace(dobDigitswSpace,'REDACTED').replace(dobDigitsOnly,'REDACTED').replace(myNameIs,'REDACTED')
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
