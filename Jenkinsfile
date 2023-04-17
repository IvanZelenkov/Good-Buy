pipeline {
    agent any
    options {
        timestamps()
    }
    environment {
        AWS_ACCOUNT_ID = "981684844178"
        AWS_REGION = "us-east-1"
        ECR_NAME = "good-buy-ecr"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        BACKEND_FOLDER_NAME = "good-buy-backend"
        LAMBDA_FUNCTION_NAMES = [
            "good-buy-dynamodb-handler",
            "good-buy-google-maps-api-handler",
            "good-buy-get-products-handler",
            "good-buy-filter-products-handler",
            "good-buy-email-subscriber-handler",
            "good-buy-email-notifier-handler"
        ]
        LAMBDA_FUNCTION_NAMES.each { name ->
            env."${name}_path" = "${BACKEND_FOLDER_NAME}/${name}"
        }
        DOCKER_IMAGE_TAGS = LAMBDA_FUNCTION_NAMES.collect { "${it}-${env.GIT_BRANCH}-${env.GIT_COMMIT}" }
    }
    stages {
        stage ("Pre-deployment stage") {
            agent {
                docker {
                    image "python:3.9"
                    args "-u 0:0"
                }
            }
            steps {
                script {
                    def exclude_dirs = "data-scripts,tests"
                    def pylint_rcfile = "${BACKEND_FOLDER_NAME}/.pylintrc"
                    sh """
                        python3 -m pip install --upgrade pip
                        pip3 install -r requirements.txt
                    """
                    parallel {
                        stage("Unit tests") {
                            sh "python3 -m pytest -r ${BACKEND_FOLDER_NAME}"
                        }
                        stage("Security tests") {
                            sh "python3 -m bandit --exclude ${exclude_dirs} -r ${BACKEND_FOLDER_NAME}"
                        }
                        stage("Linting tests") {
                            sh "python3 -m pylint --rcfile=${pylint_rcfile} --ignore=${exclude_dirs} -r y ${BACKEND_FOLDER_NAME}"
                        }
                        stage("Coverage") {
                            steps {
                                sh "python3 -m coverage run --source=${BACKEND_FOLDER_NAME} -m pytest -r ${BACKEND_FOLDER_NAME}"
                                sh "python3 -m coverage report"
                            }
                        }
                    }
                }
            }
        }
        stage("Merge branch into 'main'") {
            when {
                expression {
                    def isMergeCommit = sh(script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
                    return isMergeCommit.startsWith("Merge pull request #")
                }
            }
            stages {
                stage("Authenticate Docker client to ECR") {
                    steps {
                        sh '''
                            aws ecr get-login-password \
                            --region ${AWS_REGION} \
                            | docker login \
                            --username AWS \
                            --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        '''
                    }
                }
                stage("Build Docker images") {
                    steps {
                        script {
                            parallel (
                                LAMBDA_FUNCTION_NAMES.collectEntries { functionName ->
                                    def handlerPath = env."${functionName}_path"
                                    def dockerImageTag = DOCKER_IMAGE_TAGS[LAMBDA_FUNCTION_NAMES.indexOf(functionName)]
                                    ["Build ${functionName} image": {
                                        dir(handlerPath) {
                                            sh "docker build -t ${dockerImageTag} ."
                                        }
                                    }]
                                }
                            )
                        }
                    }
                }
                stage("Tag Docker images") {
                    steps {
                        script {
                            parallel (
                                LAMBDA_FUNCTION_NAMES.collectEntries { functionName ->
                                    def handlerPath = env."${functionName}_path"
                                    def dockerImageTag = DOCKER_IMAGE_TAGS[LAMBDA_FUNCTION_NAMES.indexOf(functionName)]
                                    ["Tag ${functionName} image": {
                                        dir(handlerPath) {
                                            sh "docker tag ${dockerImageTag} ${REPOSITORY_URI}:${dockerImageTag}"
                                        }
                                    }]
                                }
                            )
                        }
                    }
                }
                stage("Push Docker images to ECR") {
                    steps {
                        script {
                            parallel (
                                LAMBDA_FUNCTION_NAMES.collectEntries { functionName ->
                                    def handlerPath = env."${functionName}_path"
                                    def dockerImageTag = DOCKER_IMAGE_TAGS[LAMBDA_FUNCTION_NAMES.indexOf(functionName)]
                                    ["Push ${functionName} image": {
                                        dir(handlerPath) {
                                            sh "docker push ${dockerImageTag} ${REPOSITORY_URI}:${dockerImageTag}"
                                        }
                                    }]
                                }
                            )
                        }
                    }
                }
                stage("Deploy Docker images to Lambdas from ECR") {
                    steps {
                        script {
                            parallel (
                                LAMBDA_FUNCTION_NAMES.collectEntries { functionName ->
                                    def dockerImageTag = DOCKER_IMAGE_TAGS[LAMBDA_FUNCTION_NAMES.indexOf(functionName)]
                                    def dockerImageUri = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${dockerImageTag}"
                                    ["Deploy ${functionName} image": {
                                        sh """
                                            aws lambda update-function-code \\
                                            --region ${AWS_REGION} \\
                                            --function-name ${functionName} \\
                                            --image-uri ${dockerImageUri}
                                        """
                                    }]
                                }
                            )
                        }
                    }
                }
                stage ("Prune Docker resources") {
                    steps {
                        sh "docker system prune -af --volumes"
                    }
                }
            }
        }
    }
}