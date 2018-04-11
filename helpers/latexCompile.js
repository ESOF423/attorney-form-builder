const latex = require('node-latex')
const fs = require('fs')
const path = require('path')

const uuidv1 = require('uuid/v1');

const { exec } = require('child_process');

var compile = (form, formAnswers) => {
    return new Promise((resolve, reject) => {

        // replaces all the varaibels with their 
        var input = formAnswers.reduce((accumulator, formAnswer) => {
            return accumulator.replace(new RegExp(`\\{${formAnswer.questionLabel}\\}`, 'gm'), formAnswer.answer)
        }, form.template)

        // get a list of all the used containers (ignoring root container)
        var containersUsed = formAnswers.filter(el => {
            return !!el.containerLabel
        })

        // replace the used containers container text (the [containerlabel ... ] format)
        containersUsed.forEach(el => {
            input = input.replace(new RegExp(`(\\[${el.containerLabel})((\\r\\n|\\r|\\n|.)*?)(\\])`, 'gm'), '$2')
        })

        // remove any un-used containers from input
        input = input.replace(new RegExp(`\\[((\\r\\n|\\r|\\n|.)*?)\\]`, 'gm'), '')

        // wrap input in the necessary latex
        input = `
        \\documentclass[11pt]{article}
        \\begin{document}
        ${input}
        \\end{document}
        `

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
