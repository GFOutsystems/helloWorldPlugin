var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

if(process.env.npm_package_config_moduleName == null) {
    throw new Error("Missing moduleName configuration in package.json");
}

if(process.env.npm_config_repositoryURL == null || process.env.npm_config_branch == null || process.env.npm_config_environment == null) {
    throw new Error("Missing repositoryURL, branch, environment arguments");
}

if(process.env.npm_config_authentication == null) {
    throw new Error("Missing authentication argument");
}

var repository = process.env.npm_config_repositoryURL;
var branch = process.env.npm_config_branch;
var environment = process.env.npm_config_environment;
var moduleName = process.env.npm_package_config_moduleName;
var basicAuthentication = process.env.npm_config_authentication;

var url = "https://" + environment + "/CodeUpdater/rest/Bulk/ExtensabilityUpdate";

var extensibilityChangeJson = {
    "plugin": {
        "url": repository+"#"+branch
    }
};

console.log("Auth:" + basicAuthentication);

var extensibilityChangeString = JSON.stringify(extensibilityChangeJson);
var buffer = new Buffer.from(extensibilityChangeString);
var base64 = buffer.toString('base64');

var body = [{
    "ModuleName": moduleName,
    "Content": base64
}];

console.log(
    "Started changing extensibility in module " + moduleName + 
    ".\n -- Extensibility will be configured to: " + repository+"#"+branch +
    "\nin environment:" + environment

);

var request = new XMLHttpRequest();
request.open("POST", url, false);
request.setRequestHeader("Authorization", basicAuthentication);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(body));

if(request.status == 200) {
    console.log("Successfully updated OML");
} else {
    throw new Error("Network Error:" + request);
}