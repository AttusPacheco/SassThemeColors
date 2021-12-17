const FILE_SYSTEM = require('fs'), // npm i fs
    CHILD_PROCESS = require('child_process') // npm i child_process

let fileVars = './public/sass/_variables.sass',
    fileName = './public/sass/theme.sass',
    colors = process.argv.slice(2)

if (colors.length > 0) {
    FILE_SYSTEM.readFile(fileVars, (e, data) => {
        let originalData = data.toString()

        data = originalData
        for (let i = 0; i < colors.length; i++) {
            data = data.replace("'${clrArg"+(i+1)+"}'", colors[i])
        }

        FILE_SYSTEM.truncate(fileVars, () => {})
        FILE_SYSTEM.writeFile(fileVars, data, () => {})

        CHILD_PROCESS.exec(`sass --style=compressed --no-source-map ${fileName} ./public/css/theme.css`, (e) => {
            if (e) console.log(e);

            FILE_SYSTEM.truncate(fileVars, function () {})
            FILE_SYSTEM.writeFile(fileVars, originalData, () => {})
        })
    })
}