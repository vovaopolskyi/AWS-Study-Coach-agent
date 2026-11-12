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
- [ ] Deploy to AgentCore Runtime
- [ ] Document deployment, security, costs, and cleanup

## Current Architecture

Local HTTP client → AgentCore development server → Strands Agent → Amazon Bedrock

The agent can invoke Python tools as part of its workflow.

Cloud deployment is planned but has not yet been completed.

## Security

- AWS credentials are not stored in source code.
- Local configuration and deployment state are excluded from Git.
- AWS permissions and deployment configuration will be reviewed before provisioning resources.
- The project uses original practice questions and non-confidential study materials.

## Project Status

**In active development.**

The current milestone is a working local Strands agent with Amazon Bedrock inference and tool calling.