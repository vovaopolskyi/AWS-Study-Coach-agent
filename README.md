# AWS AI Certification Study Coach Agent

An AI-powered AWS Certification Study Coach built with Python, Strands Agents SDK, Amazon Bedrock, and Amazon Bedrock AgentCore.

## Project Overview

This project demonstrates practical AI agent development using AWS generative AI services, infrastructure as code, observability, and IAM security controls.

The goal is to build an intelligent study assistant capable of explaining AWS concepts, retrieving curated study materials, and supporting interactive certification practice.

The current implementation is a working cloud-deployed prototype. Certification-specific study tools are planned for future development.

## Technology Stack

- Python 3.12
- Strands Agents SDK
- Amazon Bedrock (Amazon Nova Micro)
- Amazon Bedrock AgentCore Runtime
- AWS CDK and AWS CloudFormation
- AWS IAM and IAM Identity Center
- Amazon CloudWatch
- Git and GitHub

## Current Progress

- [x] Initialize the AgentCore project
- [x] Configure a Strands agent with Amazon Bedrock
- [x] Run the agent locally
- [x] Implement and verify the `add_numbers` Python tool
- [x] Deploy the agent to AgentCore Runtime in `eu-central-1`
- [x] Verify cloud agent invocation and tool execution
- [x] Inspect runtime logs in Amazon CloudWatch
- [x] Add resource tagging to the CDK configuration
- [x] Document the least-privilege deployment design
- [x] Create an IAM permissions boundary for the Runtime execution role
- [x] Apply the permissions boundary to the deployed execution role
- [x] Verify successful agent invocation after applying the boundary
- [x] Create a dedicated CloudFormation execution role with scoped initial permissions
- [x] Prepare a boundary-only CloudFormation change set for review
- [ ] Execute and verify the boundary-only CloudFormation change set
- [ ] Complete and validate the least-privilege CloudFormation deployment workflow
- [ ] Implement the study materials search tool
- [ ] Implement the practice question tool
- [ ] Add automated tests
- [ ] Complete deployment, cost, and cleanup documentation

## Current Architecture

### Local Development

```text
Local Client
     |
AgentCore Development Server
     |
 Strands Agent
     |
 Amazon Bedrock
 (Nova Micro)
```

### AWS Cloud Deployment

```text
Amazon Bedrock AgentCore Runtime
          (eu-central-1)
                 |
           Strands Agent
             /       \
    Amazon Bedrock   Python Tools
      (Nova Micro)    (add_numbers)
```

**Infrastructure:** AWS CDK / CloudFormation

**Observability:** Amazon CloudWatch Logs

**Runtime identity:** Dedicated IAM execution role with a customer-managed permissions boundary

## Security

The project follows a least-privilege security approach.

### Developer Access

- AWS credentials are not stored in application source code.
- Developer access uses AWS IAM Identity Center with MFA and temporary SSO credentials.
- Local configuration and deployment state are excluded from Git.
- Read-only and administrative AWS CLI profiles are used for different tasks.

### Runtime Permissions

- The AgentCore Runtime uses a dedicated IAM execution role.
- A customer-managed IAM permissions boundary named `AWSStudyCoachRuntimeBoundary` has been created and applied to that role.
- The boundary limits the maximum permissions available to the Runtime execution role.
- The boundary policy was validated with AWS IAM Access Analyzer.
- A live cloud invocation was successfully tested after the boundary was applied.
- The test confirmed an `add_numbers` tool call with inputs `7` and `5`, producing the result `12`.

An IAM permissions boundary is not a permission grant by itself. Effective permissions depend on the role's other applicable IAM policies and controls.

### Deployment Permissions

- A separate IAM role, `StudyCoachCloudFormationExecutionRole`, has been created.
- Scoped initial permissions have been added and tested using IAM Policy Simulator.
- The role has **not** been assigned to the existing CloudFormation stack.
- The current CDK deployment path has not yet been migrated to this restricted role.
- The least-privilege CloudFormation execution policy remains under development and must not be treated as production-ready.

Security documentation and policy templates are maintained in the `security/` directory.

## Infrastructure and Deployment Status

The application is deployed to Amazon Bedrock AgentCore Runtime in AWS Region `eu-central-1`.

The CDK configuration includes the intended permissions boundary and project resource tags.

The permissions boundary has already been applied manually to the live execution role. A CloudFormation change set has been created to bring the deployed template into alignment with that boundary, but the change set has **not yet been executed**.

The current CDK diff also includes a CodeZip artifact change. To avoid an unrelated application update during the IAM security migration, a separate boundary-only CloudFormation template was prepared and validated.

**Do not execute an unrestricted `cdk deploy` until the CodeZip difference and deployment permissions have been reviewed.**

## Validation

The following checks have been completed:

- TypeScript CDK build
- CDK synthesis and diff inspection
- IAM permissions boundary policy validation
- IAM policy simulation for selected deployment actions
- CloudFormation template validation
- Successful direct AgentCore Runtime invocation after applying the boundary
- Successful `add_numbers(7, 5)` tool execution

These checks validate the current prototype and selected security scenarios. They do not replace automated regression testing or a complete security review.

## Known Issues and Future Work

- OpenTelemetry span export returned HTTP 400 during earlier testing. Agent invocation and tool execution succeeded; observability investigation remains open.
- Agent streaming output included internal `<thinking>` text. Response filtering should be reviewed before exposing the agent to end users.
- The CDK diff includes an unintended CodeZip artifact change.
- The CloudFormation execution role requires additional least-privilege design and rollback validation before it can be used for stack deployments.
- Automated tests and certification study tools are not yet implemented.

## Project Status

**Active development: cloud prototype deployed, security hardening in progress.**

Amazon Bedrock inference and Python tool execution have been verified successfully with the Runtime permissions boundary in place.

Next milestones include CloudFormation security alignment, least-privilege deployment, certification study tools, automated testing, and improved observability.