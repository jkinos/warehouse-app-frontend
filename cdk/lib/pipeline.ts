import * as CDK from '@aws-cdk/core'
import * as CodeBuild from '@aws-cdk/aws-codebuild'
import * as S3 from '@aws-cdk/aws-s3'
import * as CodePipeline from '@aws-cdk/aws-codepipeline'
import * as CodePipelineAction from '@aws-cdk/aws-codepipeline-actions'

export interface PipelineProps extends CDK.StackProps {
  github: {
    owner: string
    repository: string
  }
}

export class Pipeline extends CDK.Stack {
  constructor(scope: CDK.App, id: string, props: PipelineProps) {
    super(scope, id, props)

    const bucketWebsite = new S3.Bucket(this, 'WebsiteDeploymentBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
    })

    const outputSources = new CodePipeline.Artifact()
    const outputWebsite = new CodePipeline.Artifact()

    const pipeline = new CodePipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'Website',
      restartExecutionOnUpdate: true,
    })


    pipeline.addStage({
      stageName: 'Source',
      actions: [
        new CodePipelineAction.GitHubSourceAction({
          actionName: 'GitHub',
          owner: props.github.owner,
          repo: props.github.repository,
          oauthToken: CDK.SecretValue.secretsManager('GitHubToken'),
          output: outputSources,
          trigger: CodePipelineAction.GitHubTrigger.WEBHOOK,
        }),
      ],
    })


    pipeline.addStage({
      stageName: 'Build',
      actions: [

        new CodePipelineAction.CodeBuildAction({
          actionName: 'Website',
          project: new CodeBuild.PipelineProject(this, 'BuildWebsite', {
            projectName: 'Website',
            buildSpec: CodeBuild.BuildSpec.fromSourceFilename('./cdk/buildspec.yml'),
          }),
          input: outputSources,
          outputs: [outputWebsite],
        }),
      ],
    })


    pipeline.addStage({
      stageName: 'Deploy',
      actions: [

        new CodePipelineAction.S3DeployAction({
          actionName: 'Website',
          input: outputWebsite,
          bucket: bucketWebsite,
        }),
      ],
    })

    new CDK.CfnOutput(this, 'WebsiteURL', {
      value: bucketWebsite.bucketWebsiteUrl,
      description: 'Website URL',
    })
  }
}