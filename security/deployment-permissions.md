# Study Coach Deployment Permissions

## Goal
Replace broad AdministratorAccess with scoped deployment permissions.

## Developer Access
- IAM Identity Center: StudyCoachDeployment
- Access only to required CDK deployment operations

## CloudFormation Execution Role
- Manage the Study Coach AgentCore Runtime
- Manage the agent's dedicated IAM execution role and policy
- Restrict permissions to project resources where supported

## Security Requirements
- Restrict iam:PassRole to approved roles and services
- Avoid unrestricted IAM administration
- Preserve a tested recovery path

## Validation
- Review IAM policies before deployment
- Test the restricted deployment profile
- Remove temporary admin assignment after successful validation

## Current Security Audit

### CDK Bootstrap

- CloudFormation stack: CDKToolkit
- CloudFormationExecutionRole currently has AdministratorAccess.
- DeploymentActionRole can pass the specific CloudFormationExecutionRole.
- DeploymentActionRole has CloudFormation, S3, KMS and SSM permissions.
- DeploymentActionRole trusts principals from the same AWS account.

### AgentCore Runtime

- CloudFormation stack: AgentCore-AWSStudyCoach-default
- Runtime has a dedicated IAM execution role.
- The execution role has permissions for Bedrock inference,
  CloudWatch logging, X-Ray and AgentCore services.
- Bedrock and S3 resource patterns contain wildcards.
- Resource scopes require further review.

### Next Security Changes

- Design a scoped CloudFormation execution policy.
- Restrict IAM role and policy management.
- Configure StudyCoachDeployment through IAM Identity Center.
- Validate deployment and rollback permissions.
- Remove temporary BootstrapAdmin assignment after validation.

## AgentCore Runtime Permissions

### Existing Runtime
- GetAgentRuntime: read runtime configuration.
- UpdateAgentRuntime: update the existing Study Coach runtime.
- Scope access to the approved runtime ARN.

### Creating a Runtime
- CreateAgentRuntime requires separate authorization.
- Investigate aws:RequestTag conditions to restrict creation.
- Avoid unrestricted runtime creation without guardrails.

### IAM Security
- Restrict iam:PassRole to the dedicated AgentCore execution role.
- Apply a permissions boundary to roles managed by CloudFormation.
- Ensure rollback and cleanup operations remain possible.

## Runtime Permissions Boundary Design

### Scope
- Apply the boundary to the AgentCore Runtime Execution Role.
- Keep runtime permissions separate from CDK deployment permissions.

### Required Capabilities
- Invoke the approved Amazon Bedrock model.
- Write application logs to CloudWatch.
- Publish required telemetry to X-Ray and CloudWatch.
- Access required AgentCore service operations.

### Restrictions
- Do not grant IAM administration to the runtime.
- Restrict access to approved resources where supported.
- Preserve permissions required for successful agent execution.

### Deployment Safety
- Validate the boundary before applying it.
- Review the synthesized CloudFormation template.
- Test cloud invocation after deployment.
- Keep an administrative recovery path during validation.

## Runtime Permission Review

### Keep for Initial Validation
- CloudWatch Logs operations (statements 1-3)
- X-Ray and CloudWatch metrics (statements 4-5)
- Bedrock model invocation (statement 7)

### Requires Further Investigation
- AgentCore workload token operations (statement 6)
- CloudWatch Logs management operations (statement 8)
- AgentCore Configuration Bundle operations (statement 9)
- S3 read operations (statement 10)

### Security Decisions
- Do not remove permissions without testing runtime behavior.
- Restrict Bedrock access to approved models where possible.
- Restrict S3 access to required deployment resources.
- Validate any boundary before attaching it to the runtime role.
- Preserve a recovery path if deployment or invocation fails.

## Deployment Security Architecture

### Runtime Execution Role
- CDK currently generates the IAM role name.
- The deployed role does not have a permissions boundary.
- Apply a dedicated customer-managed permissions boundary.
- Verify that CloudFormation can update the role without replacement.

### CloudFormation Execution Role
- Replace AdministratorAccess with a custom deployment policy.
- Restrict iam:PassRole to the approved Runtime Execution Role.
- Require the approved boundary when creating managed IAM roles.
- Restrict IAM role and policy lifecycle permissions.
- Protect against removing or replacing the boundary.

### Migration Strategy
1. Prepare and validate the Runtime permissions boundary.
2. Apply the boundary through CDK while retaining admin recovery access.
3. Verify deployment, rollback capability, and cloud invocation.
4. Restrict the CDK bootstrap CloudFormation Execution Role.
5. Validate deployment using the restricted SSO role.
6. Retire broad administrative deployment access only after successful validation.

## CodeZip Reproducibility

### Findings
- CDK synth produces a stable artifact hash across repeated runs.
- The current artifact differs from the deployed artifact.
- The deployed ZIP contains strands-agents 1.64.0.
- The current ZIP contains strands-agents 1.65.0.
- Python dependencies have changed without Git changes to uv.lock.
- The CDK asset manifest references an already-created ZIP file.
- The precise AgentCore CLI dependency resolution mechanism
  has not yet been confirmed.

### Deployment Guardrail
- Do not deploy the current CDK changes while CodeZip drift is unexplained.
- Validate dependency versions against the lockfile.
- Keep IAM security changes separate from Python dependency updates.