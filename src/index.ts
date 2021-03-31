import fs from "fs"
import path from 'path'
import Handlebars from "handlebars"

export function render(resume: object) {

  try {

    const cssPath = path.join(__dirname, '..', "/theme/theme.css")
    const templatePath = path.join(__dirname, '..', "/theme/resume.hbs")
    const partialsDirPath = path.join(__dirname, '../theme/partials');

    const css = fs.readFileSync(cssPath, "utf-8");
    const template = fs.readFileSync(templatePath, "utf-8");

    const filenames = fs.readdirSync(partialsDirPath);

    filenames.forEach(function (partialFilename) {
      var matches = /^([^.]+).hbs$/.exec(partialFilename);
      if (!matches) {
        return;
      }
      var name = matches[1];
      var partialFilepath = path.join(partialsDirPath, partialFilename)
      var partialTemplate = fs.readFileSync(partialFilepath, 'utf8');

      Handlebars.registerPartial(name, partialTemplate);
    });
    return Handlebars.compile(template)({
      css: css,
      resume: resume
    });
  } catch (error) {
    const { message } = error
    console.log(message)
    process.exit(1)
  }
}