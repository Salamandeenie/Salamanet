// Core MockDOS Functionality
{
    // Prints the thing to the screen
    function print(printed, color = null)
    {
        let div = document.createElement('div');
        div.textContent = printed;
        
        document.getElementById('commandInputContainer').appendChild(div);
        if(color)
        {
            div.style.color = color.toLowerCase();
        }
    }

    // Clears the screen
    function cls()
    {
        document.getElementById('terminal').innerHTML = '';
        document.getElementById('commandInputContainer').innerHTML = '';
    }

    // Loads a JS library into RAM. It will be lost upon reload
    function tInstall(cdn)
    {
        let tempIns = document.createElement('script');
        tempIns.src = cdn;
        tempIns.onerror = function() {
            print("Error: Unable to connect to external server", "red");
            print("Tip: Check your internet connection", "teal");
            
            let commandData = readInput("InputID" + commandNumber);
            console.log(commandNumber);
            parseInput(commandData);
            try {disableById("InputID" + commandNumber);} catch (error){}
            generateCommandInput();

            document.getElementById("InputID" + commandNumber, 0).focus();
            document.getElementById( "InputID" + commandNumber ).scrollIntoView();
        };

        document.getElementById('hed').appendChild(tempIns);
    }
}



// Generator Functions
{
    // Creates a new commandInput and disables the old one.
    function generateCommandInput()
    {
        commandNumber++;

        const commandInputContainer = document.getElementById('commandInputContainer');

        const commandSnippet = document.createElement('div');
        commandSnippet.id = "commandSnippetID" + commandNumber;
        
        const curDir = document.createElement('label');
        curDir.textContent = "M:/" + currentDir + '>';
        curDir.htmlFor = "InputID" + commandNumber;
        curDir.Id = "currentDirID" + commandNumber;
        commandSnippet.appendChild(curDir);

        const input = document.createElement('input');
        input.id = "InputID" + commandNumber;
        input.className = 'commandInput';
        commandSnippet.appendChild(input);

        commandInputContainer.appendChild(commandSnippet);


        document.body.addEventListener('keydown', handleEnterKey);

        return "commandSnippetID" + commandNumber;
    }
}
// Finder Functions
{
    function readInput(inputId){

        const inp = document.getElementById(inputId);
        if(!inp) {
            return null; // Input does not exist.
        } 
        let data = inp.value;
        console.log(data);
        return data;
    }
}

// Parse Functions
{
// Takes the input and executes a function
function parseInput(input) {
    try {
        // Split the input into parts, considering spaces outside quotes
        const parts = input.match(/(?:[^\s"]+|"[^"]*")+/g);
        console.log(parts);

        // Extract function name
        const functionName = parts[0];

        // Extract variables (excluding the function name)
        const variables = parts.slice(1);

        // Construct the function call string
        const functionCall = `${functionName}(${variables.join(', ')})`;

        // Evaluate the function call using eval
        let excuted = eval(functionCall);
        if(functionName != "print")
        {
            print(excuted);
        }

    } catch (error) {
        console.error(`Error executing ${input}:`, error);
        if(input !== "")
        {
            print('ERROR: "'+ input +'" is not a valid input', "red");
        }
    }
}
  
}

// Button Functions
{
    // This handles the enter key. When enter is pressed, it tells the readInput function to, you wouldn't believe it, read the input.
    function handleEnterKey(e){
        if (e.key === 'Enter'){
            let commandData = readInput("InputID" + commandNumber);
            console.log(commandNumber);
            parseInput(commandData);
            try {disableById("InputID" + commandNumber);} catch (error){}
            generateCommandInput();

            document.getElementById("InputID" + commandNumber, 0).focus();
            document.getElementById( "InputID" + commandNumber ).scrollIntoView();
        }
    }
}

// Misc. Functions
{
    // This finds and disables an element using its ID.
    function disableById(id){
            let input = document.getElementById(id);
            console.log(input);
            input.disabled = true;
    }
}