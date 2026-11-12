from strands.models.bedrock import BedrockModel


def load_model() -> BedrockModel:
    """Create the Bedrock model used by Study Coach."""
    return BedrockModel(
        model_id="eu.amazon.nova-micro-v1:0",
        region_name="eu-central-1",
        temperature=0.2,
        max_tokens=1024,
    )
