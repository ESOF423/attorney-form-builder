const latex = require('node-latex')
const fs = require('fs')
const path = require('path')

const uuidv1 = require('uuid/v1');

const { exec } = require('child_process');

var compile = (form, formAnswers) => {
    return new Promise((resolve, reject) => {
        console.log(formAnswers)
        let input = ""
        if (formAnswers){
            // replaces all the varaibels with their 
            input = formAnswers.reduce((accumulator, formAnswer) => {
                return accumulator.replace(new RegExp(`\\{${formAnswer.questionLabel}\\}`, 'gm'), formAnswer.answer)
            }, form.template)
            console.log("1: " + input)

            // get a list of all the used containers (ignoring root container)
            var containersUsed = formAnswers.filter(el => {
                return !!el.containerLabel
            })

            // replace the used containers container text (the [containerlabel ... ] format)
            containersUsed.forEach(el => {
                input = input.replace(new RegExp(`(\\[${el.containerLabel})((\\r\\n|\\r|\\n|.)*?)(\\])`, 'gm'), '$2')
            })
            console.log("2: " + input)

            // remove any un-used containers from input
            input = input.replace(new RegExp(`\\[((\\r\\n|\\r|\\n|.)*?)\\]`, 'gm'), '')
            console.log("3: " + input)
        } else {
            input = form.template
        }
        

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
