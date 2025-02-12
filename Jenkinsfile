pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/lakshmikant-lpu/gaming-leaderboard.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
}