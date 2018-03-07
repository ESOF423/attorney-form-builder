const latex = require('node-latex')
const fs = require('fs')
const path = require('path')

const uuidv1 = require('uuid/v1');

const { exec } = require('child_process');

var compile = (form, formAnswers) => {
    return new Promise((resolve, reject) => {
        var input = form.template

        formAnswers.forEach(answer => {
            input = input.replace(new RegExp(`\\{\\{${answer.formQuestionId}\\}\\}`, 'g'), answer.answer)
        })

        var directoryUrl = path.join(__dirname, `../downloads/${uuidv1()}`)
        fs.mkdirSync(directoryUrl)
        fs.writeFile(directoryUrl + "/src.tex", input, () => {
            exec(`cd ${directoryUrl} && pdflatex src.tex`, () => {
                resolve(directoryUrl)
            })
        })
    })
}

module.exports = {
    compile: compile
}
