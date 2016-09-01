# passports-frontend-toolkit
Set of common UI patterns/styles for hmpo projects

## Images
Copy `assets/images/hmpo` to your image directory. Images are loaded by using the `file-url` function provided by [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit). The `file-url` function uses the `$path` variable which is set before the toolkit's modules are loaded.

## Vendor JavaScript
Additional vendor JavaScript files are included. These are:

* details.polyfill.js
* indexof.polyfill.js
* safari-cachebuster.js

Copy `assets/javascript/vendor` into your javascript directory (ie `hmpo/vendor`) and compile them with your JavaScript.
