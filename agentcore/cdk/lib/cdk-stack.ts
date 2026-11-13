import { AgentCoreApplication, type AgentCoreApplicationProps } from '@aws/agentcore-cdk';
import { Stack, Tags, type StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
export interface AgentCoreStackProps extends StackProps {
  /** Props for the AgentCore application, produced by transformAgentCoreJson from agentcore/agentcore.json. */
  application: AgentCoreApplicationProps;
}

/**
 * The stack the AgentCore CLI deploys. Everything declared in agentcore/agentcore.json is
 * created by the AgentCoreApplication construct. Add your own resources below it and wire
 * them to your runtimes and harnesses through the application's accessors.
 */
export class AgentCoreStack extends Stack {
  public readonly application: AgentCoreApplication;

  constructor(scope: Construct, id: string, props: AgentCoreStackProps) {
    super(scope, id, props);
    this.application = new AgentCoreApplication(this, 'Application', props.application);
    const runtimeBoundary = iam.ManagedPolicy.fromManagedPolicyName(
      this,
      'RuntimePermissionsBoundary',
      'AWSStudyCoachRuntimeBoundary'
    );

    iam.PermissionsBoundary.of(this.application).apply(runtimeBoundary);

    // Example: give a runtime a DynamoDB table.
    //
    // import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
    // const orders = new dynamodb.Table(this, 'Orders', {
    //   partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
    // });
    // const checkout = this.application.runtime('checkout'); // or .harness('support')
    // checkout.grantReadWrite(orders);
    // checkout.addEnvironmentVariable('ORDERS_TABLE', orders.tableName);
    Tags.of(this).add('Project', 'AWSStudyCoach');
    Tags.of(this).add('Environment', 'dev');
    Tags.of(this).add('ManagedBy', 'CDK');
  }
}
