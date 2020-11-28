import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Cdk from '../lib/pipeline';
import { config } from '../config'


test('Pipeline Stack creates resources', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Cdk.Pipeline(app, 'MyTestStack', config);
    // THEN
    expectCDK(stack).to(haveResource("AWS::S3::Bucket",{
          "WebsiteConfiguration": {
            "ErrorDocument": "error.html",
            "IndexDocument": "index.html"
          }
    }));
    expectCDK(stack).to(haveResource("AWS::CodePipeline::Pipeline"));
    expectCDK(stack).to(haveResource("AWS::CodePipeline::Webhook"));
    expectCDK(stack).to(haveResource("AWS::CodeBuild::Project"));

});
