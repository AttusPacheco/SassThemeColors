const FILE_SYSTEM = require('fs'), // npm i fs
    CHILD_PROCESS = require('child_process') // npm i child_process

let fileVars = './public/sass/_variables.sass', // Path to your variables file
    fileName = './public/sass/theme.sass', // Path to your theme file
    writeJsonFile = true, jsonContent = [],
    colors = process.argv.slice(2) // All arguments from process after second, is considered a color (first param is node.exe path, second param is the path of this file)

if (colors.length === 0) {
    try {
        colors = Object.values(JSON.parse(FILE_SYSTEM.readFileSync('colors.json').toString())) // If you don't send colors on call script, this set colors values with the colors saved into colors file
    } catch (e) {}
}

if (colors.length > 0) {
    FILE_SYSTEM.readFile(fileVars, (_exception, content) => {
        let originalContent = content.toString() // Save the original content from file to revert changes

        content = originalContent
        for (let i = 0; i < colors.length; i++) {
            let arg = "'${clrArg"+(i)+"}'",
                color = colors[i]

            jsonContent[i] = color

            content = content.replace(arg, color) // Replace the ${clrArg'X'} from your variables file
        }

        // Clear fileVars content
        FILE_SYSTEM.truncate(fileVars, () => {/* Required but, never used in this context. Implement if necessary */})

        // Insert new content into fileVars
        FILE_SYSTEM.writeFile(fileVars, content, () => {/* Required but, never used in this context. Implement if necessary */})

        // Compile the sass file with no source map and compressed to '/public/css/theme.css'
        CHILD_PROCESS.exec(`npm run sassCompile ${fileName} ./public/css/theme.css`, (ex) => {
            if (ex) console.log(ex)

            // Clear fileVars content
            FILE_SYSTEM.truncate(fileVars, function () {})
            // Insert original content into fileVars
            FILE_SYSTEM.writeFile(fileVars, originalContent, () => {})
        })

        if (writeJsonFile) {
            FILE_SYSTEM.truncate('colors.json', () => {}) // Clear color file
            FILE_SYSTEM.appendFile('colors.json', JSON.stringify(Object.assign({}, jsonContent)), (ex) => {if (ex) console.log(ex)}) // Set content into colors file
        }
    })
}