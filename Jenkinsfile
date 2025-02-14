pipeline {
    agent any

    environment {
        NODE_VERSION = '18'  // Update if needed
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/lakshmikant-lpu/game_leaderboard.git'
            }
        }

        stage('Setup Node.js') {
            steps {
                echo 'Setting up Node.js...'
                script {
                    def nodeInstalled = sh(script: 'node -v || true', returnStdout: true).trim()
                    if (!nodeInstalled.contains(NODE_VERSION)) {
                        sh "nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION}"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build'  // Runs tests as part of build
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying application...'
                sh 'echo "Deployment script goes here"'
                // Add actual deployment commands, such as copying files, Docker, SSH, etc.
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully! 🎉'
        }
        failure {
            echo '❌ Pipeline failed! Check logs for details.'
        }
    }
}
