pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID = "981684844178"
        AWS_REGION = "us-east-1"
        ECR_NAME = "good-buy-ecr"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        DYNAMO_DB_HANDLER_PATH = "good-buy-backend/good-buy-dynamodb-handler"
        GOOGLE_MAPS_HANDLER_PATH = "good-buy-backend/good-buy-google-maps-handler"
        STORE_APIS_HANDLER_PATH = "good-buy-backend/good-buy-store-apis-handler"
        LAMBDA_FUNCTION_NAME_1 = "good-buy-dynamodb-handler"
        LAMBDA_FUNCTION_NAME_2 = "good-buy-google-maps-handler"
        LAMBDA_FUNCTION_NAME_3 = "good-buy-store-apis-handler"
        DOCKER_IMAGE_TAG_1 = "${LAMBDA_FUNCTION_NAME_1}-${env.GIT_BRANCH}-${env.GIT_COMMIT}"
        DOCKER_IMAGE_TAG_2 = "${LAMBDA_FUNCTION_NAME_2}-${env.GIT_BRANCH}-${env.GIT_COMMIT}"
        DOCKER_IMAGE_TAG_3 = "${LAMBDA_FUNCTION_NAME_3}-${env.GIT_BRANCH}-${env.GIT_COMMIT}"
    }
    options {
        timestamps()
    }
    stages {
        stage ("Pre-deployment stage") {
            agent {
                docker {
                    image "python:3.9"
                    args '-u 0:0'
                }
            }
            stages {
                stage ("Install python packages") {
                    steps {
                        sh "python3 -m pip install --upgrade pip"
                        sh "pip3 install -r requirements.txt"
                    }
                }
                stage ("Unit tests") {
                    steps {
                        sh "python3 -m pytest ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
                    }
                }
                stage ("Security test") {
                    steps {
                        sh "python3 -m bandit ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
                    }
                }
                stage ("Lint") {
                    steps {
                        sh "python3 -m pylint ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
                    }
                }
            }
        }
        stage("Merge branch into main") {
            when {
                expression {
                    def isMergeCommit = sh(script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
                    return isMergeCommit.startsWith("Merge pull request #")
                }
            }
            stages {
                stage ("Authenticate docker client to ECR") {
                    steps {
                        sh '''
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        '''
                    }
                }
                stage ("Build docker images") {
                    steps {
                        script {
                            parallel (
                                "Build ${LAMBDA_FUNCTION_NAME_1} image": {
                                    dir ("${DYNAMO_DB_HANDLER_PATH}") {
                                        sh "docker build -t ${DOCKER_IMAGE_TAG_1} ."
                                    }
                                },
                                "Build ${LAMBDA_FUNCTION_NAME_2} image": {
                                    dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                                        sh "docker build -t ${DOCKER_IMAGE_TAG_2} ."
                                    }
                                },
                                "Build ${LAMBDA_FUNCTION_NAME_3} image": {
                                    dir ("${STORE_APIS_HANDLER_PATH}") {
                                        sh "docker build -t ${DOCKER_IMAGE_TAG_3} ."
                                    }
                                }
                            )
                        }
                    }
                }
                stage ("Tag docker images") {
                    steps {
                        script {
                            parallel (
                                "Tag ${LAMBDA_FUNCTION_NAME_1} image": {
                                    dir ("${DYNAMO_DB_HANDLER_PATH}") {
                                        sh "docker tag ${DOCKER_IMAGE_TAG_1} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}"
                                    }
                                },
                                "Tag ${LAMBDA_FUNCTION_NAME_2} image": {
                                    dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                                        sh "docker tag ${DOCKER_IMAGE_TAG_2} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}"
                                    }
                                },
                                "Tag ${LAMBDA_FUNCTION_NAME_3} image": {
                                    dir ("${STORE_APIS_HANDLER_PATH}") {
                                        sh "docker tag ${DOCKER_IMAGE_TAG_3} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}"
                                    }
                                }
                            )
                        }
                    }
                }
                stage ("Push docker images to ECR") {
                    steps {
                        script {
                            parallel (
                                "Push ${LAMBDA_FUNCTION_NAME_1} image": {
                                    dir ("${DYNAMO_DB_HANDLER_PATH}") {
                                        sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}"
                                    }
                                },
                                "Push ${LAMBDA_FUNCTION_NAME_2} image": {
                                    dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                                        sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}"
                                    }
                                },
                                "Push ${LAMBDA_FUNCTION_NAME_3} image": {
                                    dir ("${STORE_APIS_HANDLER_PATH}") {
                                        sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}"
                                    }
                                }
                            )
                        }
                    }
                }
                stage ("Deploy images to Lambdas from ECR") {
                    steps {
                        script {
                            parallel (
                                "Deploy ${LAMBDA_FUNCTION_NAME_1} image": {
                                    sh '''
                                        aws lambda update-function-code \
                                        --region ${AWS_REGION} \
                                        --function-name ${LAMBDA_FUNCTION_NAME_1} \
                                        --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}
                                    '''
                                },
                                "Deploy ${LAMBDA_FUNCTION_NAME_2} image": {
                                    sh '''
                                        aws lambda update-function-code \
                                        --region ${AWS_REGION} \
                                        --function-name ${LAMBDA_FUNCTION_NAME_2} \
                                        --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}
                                    '''
                                },
                                "Deploy ${LAMBDA_FUNCTION_NAME_3} image": {
                                    sh '''
                                        aws lambda update-function-code \
                                        --region ${AWS_REGION} \
                                        --function-name ${LAMBDA_FUNCTION_NAME_3} \
                                        --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}
                                    '''
                                }
                            )
                        }
                    }
                }
                stage ("Prune images, containers, networks, and volumes") {
                    steps {
                        sh "docker system prune -af --volumes"
                    }
                }
            }
        }
    }
}