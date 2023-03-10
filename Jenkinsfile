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
        stage ("Install packages, test, and lint code") {
            agent {
                docker {
                    image "python:3.9"
                    args '-u 0:0'
                }
            }
            stages {
                stage ("Install packages") {
                    steps {
                        sh "python3 -m pip install --upgrade pip"
                        sh "pip3 install -r requirements.txt"
                    }
                }
                stage ("Test") {
                    steps {
                        sh "python3 -m pytest ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
                    }
                }
                stage ("Lint") {
                    steps {
                        sh "python3 -m pylint ${STORE_APIS_HANDLER_PATH}/tests/product_retrieval.py"
                    }
                }
            }
        }
        stage ("Docker client authentication with ECR") {
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
                        stage ("Build ${LAMBDA_FUNCTION_NAME_1} image") {
                            dir ("${DYNAMO_DB_HANDLER_PATH}") {
                                sh "docker build -t ${DOCKER_IMAGE_TAG_1} ."
                            }
                        },
                        stage ("Build ${LAMBDA_FUNCTION_NAME_2} image") {
                            dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                                sh "docker build -t ${DOCKER_IMAGE_TAG_2} ."
                            }
                        },
                        stage ("Build ${LAMBDA_FUNCTION_NAME_3} image") {
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
                        stage ("Tag ${LAMBDA_FUNCTION_NAME_1} image") {
                            steps {
                                dir ("${DYNAMO_DB_HANDLER_PATH}") {
                                    sh "docker tag ${DOCKER_IMAGE_TAG_1} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}"
                                }
                            }
                        },
                        stage ("Tag ${LAMBDA_FUNCTION_NAME_2} image") {
                            steps {
                                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                                    sh "docker tag ${DOCKER_IMAGE_TAG_2} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}"
                                }
                            }
                        },
                        stage ("Tag ${LAMBDA_FUNCTION_NAME_3} image") {
                            steps {
                                dir ("${STORE_APIS_HANDLER_PATH}") {
                                    sh "docker tag ${DOCKER_IMAGE_TAG_3} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}"
                                }
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
                        stage ("Push ${LAMBDA_FUNCTION_NAME_1} image") {
                            steps {
                                dir ("${DYNAMO_DB_HANDLER_PATH}") {
                                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}"
                                }
                            }
                        },
                        stage ("Push ${LAMBDA_FUNCTION_NAME_2} image") {
                            steps {
                                dir ("${GOOGLE_MAPS_HANDLER_PATH}") {
                                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}"
                                }
                            }
                        },
                        stage ("Push ${LAMBDA_FUNCTION_NAME_3} image") {
                            steps {
                                dir ("${STORE_APIS_HANDLER_PATH}") {
                                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}"
                                }
                            }
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
        stage ("Deploy ECR images in Lambdas") {
            steps {
                script {
                    parallel (
                        stage ("Deploy ${LAMBDA_FUNCTION_NAME_1} image") {
                            steps {
                                sh '''
                                    aws lambda update-function-code \
                                    --region ${AWS_REGION} \
                                    --function-name ${LAMBDA_FUNCTION_NAME_1} \
                                    --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_1}
                                '''
                            }
                        },
                        stage ("Deploy ${LAMBDA_FUNCTION_NAME_2} image") {
                            steps {
                                sh '''
                                    aws lambda update-function-code \
                                    --region ${AWS_REGION} \
                                    --function-name ${LAMBDA_FUNCTION_NAME_2} \
                                    --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_2}
                                '''
                            }
                        },
                        stage ("Deploy ${LAMBDA_FUNCTION_NAME_3} image") {
                            steps {
                                sh '''
                                    aws lambda update-function-code \
                                    --region ${AWS_REGION} \
                                    --function-name ${LAMBDA_FUNCTION_NAME_3} \
                                    --image-uri ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_NAME}:${DOCKER_IMAGE_TAG_3}
                                '''
                            }
                        }
                    )
                }
            }
        }
    }
}