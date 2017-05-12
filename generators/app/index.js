'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      'Welcome to the splendid ' + chalk.red('\ngenerator-micro-boilerplate') + ' generator!'
    );

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What shall we name it?',
      filter: function(answer) {
        return answer.replace(/ /g, '-').toLowerCase();
      }
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const projectPath = this.props.name;

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(path.join(projectPath, 'package.json')),
      this.props
    );

    this.fs.copy(
      this.templatePath('Gulpfile.js'),
      this.destinationPath(path.join(projectPath, 'Gulpfile.js')),
      this.props
    );

    this.fs.copy(
      this.templatePath('fonts/*'),
      this.destinationPath(path.join(projectPath, 'fonts')),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/*'),
      this.destinationPath(path.join(projectPath, 'src')),
      this.props
    );
  }


  install() {

    process.chdir(this.props.name);
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
      callback: function() {
        this.emit('dependenciesInstalled');
      }.bind(this)
    });
    this.on('dependenciesInstalled', function() {
      this.spawnCommand('atom', ['.']);
      this.spawnCommand('yarn', ['build']);
    })
  }
};
