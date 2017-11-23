const co = require('co')
const prompt = require('co-prompt')
const config = require('../template')
const chalk = require('chalk')
const clone = require('git-clone')
const ora = require('ora')
const shell = require('shelljs')


module.exports = () => {

    co(function* () {

        let tplName = yield prompt('Template name: ')
        let projectName = yield prompt('Project name: ')
        let pwd = shell.pwd()

        const tpl = config.tpl.split('_')

        if (tpl.indexOf(tplName) === -1) {
            console.log(chalk.red(`\n The ${tplName} does not match any template in the remote branch !`))
            process.exit()
        }
        
        projectName = ( projectName === '' || 
                        projectName === null || 
                        projectName === undefined ) ? tplName : projectName

        const spinner = ora(`Downloading the ${tplName} from remote branch  ...`)
        spinner.start()

        const log = console.log

        log(chalk.blue('Download will take some time'))    

        clone(`https://github.com/Slice-dd/${tplName}.git`, pwd + `/${projectName}`, null, (err) => {
            if(err) {
                chalk.red(' failed to download the template')
            }else {
                spinner.stop()
                shell.rm('-rf', pwd + `/${projectName}/.git`)
                log(chalk.green('Download successfully'));
                // console.log('Download successfully');
                
            }

            process.exit()
        })
    })
}