
module.exports.register = function(Handlebars) {


    /**
     * Default value
     * @describe Provide a default value to the component if no value is injected
     * @example
     * {{default variable 'default output'}}
     */
    Handlebars.registerHelper('default', function(varRef, varDefault) {
        if(typeof varRef === 'undefined') {
            return  varDefault
        } else {
            return varRef;
        }
    });
};