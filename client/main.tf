provider "aws" {
  region = "us-east-1"  # Replace with your desired AWS region
}

resource "aws_s3_bucket" "app_bucket" {
  bucket = "react-app-bucket-${random_id.bucket_id.hex}"

  tags = {
    Name = "ReactAppBucket"
  }
}

resource "random_id" "bucket_id" {
  byte_length = 8
}



resource "aws_elastic_beanstalk_application" "react_app" {
  name = "frontend-blog"


  description = "Elastic Beanstalk Application for Frontend Blog"
}


resource "aws_elastic_beanstalk_environment" "react_app_env" {
  name                = "react-frontend-blog-env"
  application         = aws_elastic_beanstalk_application.react_app.name
  solution_stack_name = "64bit Amazon Linux 2 v3.8.3 running Docker"


  setting {
    namespace = "aws:elasticbeanstalk:container:docker:run"
    name      = "Image"
    value     = "allyhaas/frontend-blog:latest"
  }
}


output "elastic_beanstalk_url" {
  value = aws_elastic_beanstalk_environment.react_app_env.endpoint_url
}
