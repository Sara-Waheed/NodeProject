pipeline {
  agent any
  tools { nodejs "NodeJS_14" }
  environment {
    DOCKER_IMAGE = "youruser/selenium-tests:latest"
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
        sh 'npm test'
      }
    }
    stage('Deploy Container') {
      steps {
        sh '''
          docker build -t dummy-node-app:latest .
          docker rm -f dummy-node-app || true
          docker run -d --name dummy-node-app -p 3000:3000 dummy-node-app:latest
        '''
      }
    }
    stage('Selenium Tests') {
      steps {
        sh "docker run --network host ${DOCKER_IMAGE}"
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
