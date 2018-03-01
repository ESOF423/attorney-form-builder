const latex = require('node-latex')
const fs = require('fs')

module.exports = {
    compile: (form, formAnswers) => {

        console.log(JSON.stringify(formAnswers))

        // let input = form.template

        // formAnswers.forEach(answer => {
        //     input = input.replace(new RegExp(`\{\{${answer.formQuestionId}\}\}`, 'g'), answer.answer)
        // })
        
        // const output = fs.createWriteStream(`../downloads/${form.name}.pdf`)
        // const pdf = latex(input)

        // pdf.pipe(output)
        // pdf.on('error', err => console.error(err))
        // pdf.on('finish', () => console.log('PDF generated!'))
    }
}
