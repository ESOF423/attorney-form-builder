const latex = require('node-latex')
const fs = require('fs')
const path = require('path')

const uuidv1 = require('uuid/v1');

const { exec } = require('child_process');

var compile = (form, formAnswers) => {
    return new Promise((resolve, reject) => {
        // let input = form.template

        // formAnswers.forEach(answer => {
        //     input = input.replace(new RegExp(`\{\{${answer.formQuestionId}\}\}`, 'g'), answer.answer)
        // })

        var directoryUrl = path.join(__dirname, `../downloads/${uuidv1()}`)

        fs.mkdirSync(directoryUrl)

        var input = `
            \\documentclass{article}
            \\begin{document}
            Hello
            \\end{document}
        `

        fs.writeFile(directoryUrl + "/src.tex", input, () => {
            exec(`cd ${directoryUrl} && pdflatex src.tex`, () => {
                resolve(directoryUrl)
            })
        })
    })
}

var cleanup = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                cleanup(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

//compile()

module.exports = {
    compile: compile,
    cleanup: cleanup
}
