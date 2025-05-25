pipeline {
  agent any
  tools { nodejs "NodeJS_14" }
  environment {
    DOCKER_IMAGE = "sarawaheed/selenium-tests:latest"
  }
  stages {
    stage('Lint') {
      steps {
        sh 'npm install'
        sh 'npm run lint'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Unit Test') {
      steps {
        sh 'npm install'
        sh 'npm test'
      }
    }
    stage('Selenium') {
      steps {
        sh 'docker run --rm sarawaheed/selenium-tests:latest'
      }
    }
  }
  post {
    always {
      junit 'reports/**/*.xml'
      archiveArtifacts artifacts: 'screenshots/*.png', fingerprint: true
    }
  }
}
