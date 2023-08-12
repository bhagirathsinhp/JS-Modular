// Modular JavaScript (Working with Modules)...


// Knowing about JS modules with change the way we write JS code and JS projects.
// JS Modules - a key concept that helps us organize our scripts and writing multi-file code.


------------------------------------------------------------------------------------------------------------------


// 1. Splitting Code in a Sub-optimal Way...

// We have the file with our drag-drop projects.
// We can see that the core logic of it is within the App.js file.
// We might wanna split it - it would keep our code maintainable, to make easier to work on..
// And having multiple files helps us a lot when we are working with a team.
// And even if we are working alone - we would find stuff quicker.

// The idea is to split the file where all classes have their own files.

// It's a default or a standard for most projects to have one thing per file - one class, one big function per file.
// Maybe we would have a file with multiple smaller functions or such things but we get the jist of the multiple files, right?

// We create 2 new folders for the app.js and analytical.js
// Now we delete the event.js cause we used that to understand the events and don't need them here when we work on the file.

// Now in the scripts we create - Utility & App.
// We pass the analytics into utility.
// We create files in App..

// For domHelper - we create a file in utility.
// For components, tooltip, projectItem and projectList we create files in App..

// So now we have only App Class name left in app.js so there's no problem with it.

// Now we need to refactor the code here.
// The analytics source - analyticsScript.src - will be named accordingly to the place and file name of the Analytics.js.
analyticsScript.src = "assets/scripts/Utility/Analytics.js";

// We can split the other code and move them to their respectful files.
// So with that we are done with the moving and now we will fix the code cause all the fuctionality code has just disappeared from the working file..

// Now we can import these files in index.html - but we have to very much CAREFUL while doing this cause we cannot - CANNOT MESS UP THE ORDER - the order of which our app and our code is factored.
// Let's look at an example for it - we order this way which is the right way...

<script src="assets/scripts/app.js" defer></script>
<script src="assets/scripts/Utility/DOMHelper" defer></script>
<script src="assets/scripts/App/Components.js" defer></script>
<script src="assets/scripts/App/Tooltip.js" defer></script>
<script src="assets/scripts/App/ProjectItem.js" defer></script>
<script src="assets/scripts/App/ProjectList.js" defer></script>

// When this order is fulfilled - then & only then the app will function.
// It depends on which features we need from the other files.
// If the order isn't right the app will break.

// Now there are some bad implications on using such a way cause when the application is big we will enter a nightmare - and that's where JS Modules step in...


-----------------------------------------------------------------------------------------------------------------


// 2. A First Step Towards JavaScript Modules...

// We have dependency of one file over other - for eg: tooltip is used in projectitem and so on...

// The tooltip extends component = so it needs it to work.
// We will see how JS modules helps us with it.

// We go to components and there we add a special keyword - which makes it clear that we are exporting it.

// IMPORTANT FACTOR ABOUT MODULES IS THAT WHEN WE ADD IT TO A CLASS, A FILE = THAT FILE WILL BE LOCKED - MEANING ALL THE AVAILABLE CONTENT IN IT WILL NOT BE ADDED ON THE GLOBAL SCOPE OBJECT.

// The keyword we use is - EXPORT..
// This keyword let's JS know this file can be available to export and we can use it within other files..

// We add export in front of class component{}

// And now we switch to modules and to do that we will go to our root app.js script..
// IMP - there should be atleast one script we can import into HTML - we need one starting point - other files can point to eachother.
// Now to that script we need to add type="module" in index.HTML.
<script src="assets/scripts/app.js" defer type="module"></script>
// So this tells browser that this script and all the scripts referenced by this script will now use modules.

// Now we save this and we get an error which we need to fix - the error is an important one...


-----------------------------------------------------------------------------------------------------------------


// 3. We Need a Development Server!...

// Since modules let script point to other scripts that should be imported - we have to be strict regarding security.
// We need to make sure that a script can't import a script from another page which might be MALICIOUS.
// How this might happen? - we would be using third-party libraries which might be compromised and might try to download files from other malicious files..

// This is why we have a cross-origin request policy - which means cross domain requests are not allowed.
// We are only allowed to download scripts from the same domain the page is running on.

// Now our index.html opens with a file protocol - js features work fine with it but web server dependent features such as cross-origin policy don't work here.
// This policy requires the page to be served from a real web server in order to be validated.

// Therefore we need to serve our page through web-server and not a file-protocol.
// So we might need a server and pay for it - but we have serve npm.
// This package let's us run a server on our pc.
// We download it from npm.

// Here we get a basic web-server which we can install on our pc and run on our system.
// We don't need to deploy our page anywhere - we don't need to rent a server.

// Now to install it we need to install node.js though. 
// We will learn about node.js in different module and here we don't need to write node.js code we just need to install the runtime - cause that server is written is node.js...

// Node.js will give us a tool which we can use to install the serve tool on our machine.
// Now after node.js installation we need to use a special command to install the serve tool.
// For that we need to open the command prompt.
// We type npm install -g serve 
// -g stands for global. 
// This will install serve tool globally.
// Node.js ships with it's own package management system which we will learn about later in the tooling module.

// Now we open up the Terminal of VS Code.
// This terminal is navigated into our project folder.
// We will type in serve - which will search for index.html file and serve that through the dummy server..
// Now an important factor is that for terminal we use command prompt rather than powershell.

// We copy the address from the terminal - from the serve and paste it within the browser and we won't get the cross-origin policy error.

// We always need to keep the server running whenever we wanna start the project.


-----------------------------------------------------------------------------------------------------------


// 4. First import / export Work...

// We use the exported class by importing it somewhere.
// We can export anything - functions, variables, constants and so on.

// To do import on tooltip - the import of component class - we use the IMPORT keyword with FROM.
// Then we tell JS we import it from where - '' - we use strings to pass in the path.
// import from....

// In strings '' - we can write....
// './' = means we look into the same folder.
// '..' = means we wanna go up one folder.
// '/' = to have an absolute path from the root.
// We use ./.
import from './Components';

// We still get an error here.
// Problem is we can't export more than one thing.
// Now the component is just one class - but that's the not a technical limitation.

// We gotta tell JS what we wanna import from the file..
// We use {} in between the import-from.
// There in the {}  we write the exact name of what we wanna import.
// Here it's component class - so we write that...
// IMP - we have to write the extension..
import { Component } from './Components.js'

// So now we import component into tooltip file.
// But it'll show error in console.
// It's cause we still have the regular tooltip script source in Index.html instead with one without the module type which utilizes the module features such as Import & Export..
<script src="assets/scripts/App/Tooltip.js" defer type="module"></script>

// Now Max's script doesn't show error but mine does - the error is that DOMHelper is undefined in Projectitem.
// Ok this was my mistake - it haven't sourced the correct path for DOMHelper within index.html...

// Now we will use modules on all the files and just let app.js be the entry point...


--------------------------------------------------------------------------------------------------------------


// 5. Switching All Files To Use Modules....

// We switch to module only setup.
// We comment out the source script in index.html.
// We leave only app.js as the root entry point.

// We start in App.js...
// We are using project list in there - so it's a dependency of app class in app.js.
// So we export the project list class file.
// We import it in App.js..
import { ProjectList } from "./App/ProjectList";
// We make this class available for app.js..

// Now we see projectitem isn't defined.
// The error is coming from project list.
// So we export project item and import it within projectlist..

// Now we have error for DOMHelper on project item.
// We fix that by exporting it to the project item.
// In project item we have tooltip - so we export the tooltip into it..
// Next in project list we need to import domhelper cause we use it there too...

// SIDE NOTE - We can use import & export in same file...

// Super Advantage of multiple parts is that we can find the failing parts...

// Now our project works...


-------------------------------------------------------------------------------------------------------------


// 6. More Named Export Syntax Variations..

// There are couple of alternative syntax regarding modules.
// We will see which syntax exists..

// Let's say we wanna export 2 individual functions.
// They are in the DOMHelper class for example (not really there we are just taking them hypothetically).

// We can use export on both of them...
export function funcOne(){}
export function funcTwo(){}

// Now we can also import multiple things...
// For eg. we have our DOMHelper class we wanna import in our project list class file but we also wanna import the funcOne() function..
// We can do that by mentioning the function name in the {} of the import alongside DOMHelper and seperating them with a ,...
import { DOMHelper, funcOne } from "../Utility/DOMHelper.js";
// This made it clear that we can import whatever we want - we didn't use the 2nd function cause we don't need it here...

// Now let's say we wanna import everything in a file.
// We wanna import DOMHelper, funcOne & funcTwo.
// We can name everything like above and seperate them with a comma. 

// But we wanna bundle everything exported in an object and we can access each with the . notation.
// For this we have special syntax.

import * as DOMh from "./Utility/DOMHelper.js"
// We create an object with * notation.
// Then we use AS...
// We gave it a name of DOMh.
// We can now use it where both the functions and DOMHelper class was used and access these with . notation.
// For eg: 
DOMh.DOMHelper(...);
DOMh.funcOne(...);
DOMh.funcTwo(...);

// This way we don't have to add anything in the import - we can just access these things dynamically through a object which has these functions and class.

// This is an alternative, we can use it if we wanna bundle multiple exports and access them through this helper object in the importing file.

// The AS notation can also be used in general to assign new names.
// Let's take the ProjectItem class name in the project list class file.
// We named ProjectItem in it's file but here in the project list we wanna use different name maybe because of name class or we have some other element or some other const.
const ProjectItem = 'abc';
// Whenever this is the issue we can assign an alias to the imported thing.

// We use AS in the { } with the ProjectItem name and give it another name which can only be relevant in the given file.

import { ProjectItem as PrjItem } from "./ProjectItem.js";
// Inside of the project list class file - we have to use PrjItem in place wherever we used ProjectItem.
// Ofcourse this doesn't change the name in the original file - it really is just an alias in this file...


----------------------------------------------------------------------------------------------------------


// 7. Working With Default Exports...

// If we have one core element which is exported in a file or maybe the only element exported in a file - like the component is the only exported thing in Components.js - we can export it as we did before.
// But we can also name it with DEFAULT...

// We can omit the class name and just use default like this - and point to the file and automatically the default export will be picked...
export default class Component {};
// We remove the name...
export default class {};

// We can still have named exports along that..
export function doAny(){}

// Now how do we use this in the imported file..
// As we use the default component in tooltip - we can see that it throws error...

// We use what we used before...
import Cmp from "./Components.js";
// We use any name of our choice and this will let JS know that the name without {} is the default export of that file from which it's exported...
// We also have to rename the extended Component to Cmp otherwise it will fail...

// The disadvantage is that when we use a rename - the team which we work with might have other naming conventions - which would lead to confusion.
// It's always better for a team to settle for the name which is forced onto us..

// Now if we wanna use that doAny export - we just do it this way....
import Cmp, { doAny } from "./Components.js";
// So we can have default export with the non-default(named) export side by side...

// IMP - We can only have 1 default per file...


-------------------------------------------------------------------------------------------------------


// 8. Dynamic Imports & Code Splitting...

// If we go to the network tab - we see bunch of requests cause we're using bunch of files.
// Now here it's a small project so there's no problem but when the application is large - sending a request, getting a response and parsing the response always takes time - the network latency, browser getting started etc...

// More request we send, the more time we accumulate.
// Therefore having hundreds of modules wouldn't be a great idea cause then we would have to import hundreds of files and send hundreds of HTTPRequests..
// We will solve this problem in the next course when we look into tooling and bundling.

// Other improvement we gotta add is that some features aren't always needed.
// For eg: ToolTip...
// Tooltip here is loaded cause we might actually show the tooltip but unless we click a button - we don't really need the file.
// In addition the tooltip is the only file that needs the component class file...
// We would only load this file when we need them, we would speed up the initial page load - we would request less files to be downloaded and parsed.

// To load modules conditionally - we can use an alternative import syntax.
// The import syntax we show is the static import syntax - it statically defines the dependancy of the file.

// The other is dynamic import..
// We use this to load the script dynamically when it's needed.
// For other files - the statical import is appropriate cause we need those files on the go. But for tooltip it's not the case.

// In project Item where we need tooltip - if we click on the show more info button - so therefore importing tooltip up there statically when the project item file is downloaded is of no use - we can import and load it where we call it - use it whenever the button is pressed.

// How?
// With a special syntax..
import();
// Import as a function.
// We pass in the string with file path.
// The import function is build into the browser - and gives us a promise - so it takes then() or we can use async await...
import('./App/Tooltip.js').then();
// Here we get our module in then().
// We can run code that requires the module...
// Here we can access tooltip with module.Tooltip..

import('./App/Tooltip.js').then(module => {
  const tooltip = new module.Tooltip(
    () => {
      this.hasActiveTooltip = false;
    },
    tooltipText,
    this.id
  );
  tooltip.attach();
  this.hasActiveTooltip = true;
});

// So when the code runs - that's where it will reach out to the file...
// So if we save it and reload - we can see that tooltip and component are not getting downloaded until we press the button...


-------------------------------------------------------------------------------------------------------


// 9. When Does Module Code Execute?

// We have some code which runs inside of a module file - outside of the exported class - let's say here in project item we console log something...
console.log('Project Item Created!');

// Is this code gets executed or only the exported code gets executed?
// This code executed but just once - this code runs when the module is first imported and loaded for the first time...

// The module which we use multiple times in different files - such as DOMHelper is imported in multiple files - so this type of code within DOMHelper would execute on all the files where the Module is imported?
console.log('DOM Helper is running!')

// No - It will also run once and first time - runs on the first import....

// Also when this kinda code is there in a dynamically loaded file like tooltip. 
console.log('Tooltip Loading!');

// This will run when the tooltip button is executed - when the file is loaded.
// And this will too like others will run once the tooltip is loaded...

// Therefore code in modules executes - but only once...


--------------------------------------------------------------------------------------------------------


// 10. Module Scope & globalThis....

// It's hard to use global objects with modules.
// For eg: On app.js we define one global object..
const default_value = 'Max';
// If we use this const on another file and console it from there - we will be met with an error that this isn't defined..

// But we can use the global WINDOW object.
console.log(window);
// We could also access global window with just (this).
console.log(this); // But in module the (this) is undefined cause modules runs in strict mode out of the box...

// In the past, global variables would end up on global window object which would span across entire app..
// This was JS way of sharing data across files...

// Something defined in a module isn't shared with others unless we export it..

// Now in app.js we can set the code to window object...
window.default_value = 'Max';
// If we call this - 
console.log(window.default_value); // inside of the project list file - it won't run cause - we import project list into app so it has been executed before app.js...

// We will also get undefined if we switch order window.default_value inside app.js as it's just not allowed as IMPORTS are automatically sorted to the top...
// To make the console work we can move it into the connectDroppable which will be executed later.

// Window object is a hack around the otherwise scoped data.
// Hence we should really use it as a last resort.

// Other identifier we have is the GLOBALTHIS.
// This is basically an alternative to THIS which points at some globally available object.
// This is available on Browser and Node.js side JS...
// Window object is not available in both..

// We can use globalThis to store as well as read data..
globalThis.default_value = 'Max'; // To store data.
(globalThis.default_value) // Inside project list to read data.
// We reload and get the data...

// console.log(globalThis) - what's inside this?
// We can see it's the window object.


---------------------------------------------------------------------------------------------------------


// More on Modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules