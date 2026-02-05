pipeline {
    agent any

    environment {
        BACKEND_PORT = "8000"
        FRONTEND_PORT = "3000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JayadipReddy/my_project.git'
            }
        }

        stage('Backend Setup') {
            steps {
                bat '''
                cd backend
                if not exist .venv (
                    python -m venv .venv
                )
                call .\\.venv\\Scripts\\activate
                pip install -r requirements.txt
                '''
            }
        }

        stage('Frontend Build') {
            steps {
                bat '''
                cd frontend
                npm install
                npm run build
                '''
            }
        }

        stage('Start Backend') {
            steps {
                bat '''
                cd backend
                call .\\.venv\\Scripts\\activate
                start cmd /k uvicorn main:app --host 127.0.0.1 --port 8000
                '''
            }
        }

        stage('Start Frontend') {
            steps {
                bat '''
                cd frontend
                start cmd /k npm run start
                '''
            }
        }
    }
}
