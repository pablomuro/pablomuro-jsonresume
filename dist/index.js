"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var handlebars_1 = __importDefault(require("handlebars"));
function render(resume) {
    try {
        var cssPath = path_1.default.join(__dirname, '..', "/theme/theme.css");
        var templatePath = path_1.default.join(__dirname, '..', "/theme/resume.hbs");
        var partialsDirPath_1 = path_1.default.join(__dirname, '../theme/partials');
        var css = fs_1.default.readFileSync(cssPath, "utf-8");
        var template = fs_1.default.readFileSync(templatePath, "utf-8");
        var filenames = fs_1.default.readdirSync(partialsDirPath_1);
        filenames.forEach(function (partialFilename) {
            var matches = /^([^.]+).hbs$/.exec(partialFilename);
            if (!matches) {
                return;
            }
            var name = matches[1];
            var partialFilepath = path_1.default.join(partialsDirPath_1, partialFilename);
            var partialTemplate = fs_1.default.readFileSync(partialFilepath, 'utf8');
            handlebars_1.default.registerPartial(name, partialTemplate);
        });
        return handlebars_1.default.compile(template)({
            css: css,
            resume: resume
        });
    }
    catch (error) {
        var message = error.message;
        console.log(message);
        process.exit(1);
    }
}
exports.render = render;
