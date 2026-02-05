pipeline {
    agent any

    environment {
        DEPLOY_DIR = "C:\\deployments\\my_project"
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

        stage('Copy Code to Local Deployment Folder') {
            steps {
                bat '''
                if not exist %DEPLOY_DIR% (
                    mkdir %DEPLOY_DIR%
                )

                xcopy /E /I /Y backend %DEPLOY_DIR%\\backend
                xcopy /E /I /Y frontend %DEPLOY_DIR%\\frontend
                '''
            }
        }

        stage('Backend Setup') {
            steps {
                bat '''
                cd %DEPLOY_DIR%\\backend

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
                cd %DEPLOY_DIR%\\frontend
                npm install
                npm run build
                '''
            }
        }

        stage('Start Backend') {
            steps {
                bat '''
                cd %DEPLOY_DIR%\\backend
                call .\\.venv\\Scripts\\activate
                start "" /B uvicorn main:app --host 0.0.0.0 --port %BACKEND_PORT%
                '''
            }
        }

        stage('Start Frontend') {
            steps {
                bat '''
                cd %DEPLOY_DIR%\\frontend
                start "" /B npx next start -p %FRONTEND_PORT%
                '''
            }
        }
    }
}
