pipeline {
  agent any
  tools { nodejs "NodeJS_14" }
  environment {
    DOCKER_IMAGE = "sara-waheed/selenium-tests:latest"
  }
  stages {
    stage('Lint')       { steps { sh 'npm install'; sh 'npm run lint' } }
    stage('Build')      { steps { sh 'npm run build' } }
    stage('Unit Test')  { steps { sh 'npm test' } }
    stage('Deploy')     {
      steps {
        sh '''
          docker build -t nodeproject-app:latest .
          docker rm -f nodeproject-app || true
          docker run -d --name nodeproject-app -p 3000:3000 nodeproject-app:latest
        '''
      }
    }
    stage('Selenium')   { steps { sh "docker run --network host ${DOCKER_IMAGE}" } }
  }
  post {
    always {
      junit 'reports/**/*.xml'
      archiveArtifacts artifacts: 'screenshots/*.png', fingerprint: true
    }
  }
}
