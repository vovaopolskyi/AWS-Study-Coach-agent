# AWS AI Certification Study Coach Agent

An AI-powered AWS Certification Study Coach built with Python, Strands Agents SDK, Amazon Bedrock, and Amazon Bedrock AgentCore.

## Project Overview

This project demonstrates practical AI agent development using AWS generative AI services.

The goal is to build an intelligent study assistant capable of explaining AWS concepts, retrieving curated study materials, and supporting interactive certification practice.

## Technology Stack

- Python
- Strands Agents SDK
- Amazon Bedrock (Amazon Nova Micro)
- Amazon Bedrock AgentCore
- AWS CDK
- Git and GitHub

## Current Progress

- [x] Initialize the AgentCore project
- [x] Configure the Strands agent with Amazon Bedrock
- [x] Run the agent locally
- [x] Verify a real Python tool invocation
- [ ] Implement the study materials search tool
- [ ] Implement the practice question tool
- [ ] Add automated tests
- [x] Deploy to AgentCore Runtime in eu-central-1
- [x] Verify cloud agent invocation and Python tool execution
- [x] Inspect runtime logs in Amazon CloudWatch
- [ ] Document deployment, security, costs, and cleanup

## Current Architecture

### Local Development

Local HTTP Client → AgentCore Dev Server → Strands Agent → Amazon Bedrock

### AWS Cloud Deployment

```text
AgentCore Runtime (eu-central-1)
          |
      Strands Agent
       /       \
Amazon Bedrock  Python Tools
 (Nova Micro)    (add_numbers)
```

Observability: Amazon CloudWatch Logs  
Infrastructure: AWS CDK / CloudFormation

## Security

- AWS credentials are not stored in source code.
- Local configuration and deployment state are excluded from Git.
- AWS permissions and deployment configuration will be reviewed before provisioning resources.
- The project uses original practice questions and non-confidential study materials.
- Developer access uses AWS IAM Identity Center with MFA and temporary SSO credentials.
- The deployed agent uses a dedicated IAM execution role.

## Project Status

**In active development.**

The first cloud prototype is deployed to Amazon Bedrock AgentCore Runtime
in eu-central-1.

Amazon Bedrock inference and the demonstration add_numbers tool have
been verified through a successful cloud invocation.

Certification study tools and automated tests are planned for the
next development milestone.

## Known Issues

- OpenTelemetry span export returned HTTP 400 during testing.
  Agent invocation and tool execution were successful.
  Further observability investigation is pending.