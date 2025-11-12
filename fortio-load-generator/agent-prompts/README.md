# Fortio Load Generator MCP Agent Prompts

This directory contains specialized agent prompts designed to use the Fortio Load Generator MCP server for comprehensive performance testing of Kubernetes services.

## Available Agent Prompts

### 🚀 [Basic Load Testing](./basic-load-testing.md)
**Target Audience**: DevOps engineers, QA teams, developers new to load testing

**Use Cases**:
- Service discovery and health validation
- Simple performance testing
- Getting started with load testing workflows
- Basic API endpoint validation

**Key Features**:
- Step-by-step service discovery process
- Progressive load testing methodology
- Safety-first approach with clear guidelines
- Simple workflows suitable for beginners

---

### ⚡ [Advanced Performance Testing](./advanced-performance-testing.md)
**Target Audience**: Performance engineers, SREs, senior developers

**Use Cases**:
- Microservice dependency analysis
- Complex load pattern generation
- Performance bottleneck identification
- Database and cache performance testing

**Key Features**:
- Sophisticated load testing patterns
- Multi-service testing strategies
- Advanced result analysis techniques
- Production-ready testing scenarios

---

### 🕸️ [Service Mesh Testing](./service-mesh-testing.md)
**Target Audience**: Platform engineers, service mesh operators

**Use Cases**:
- Istio/Linkerd performance validation
- Sidecar proxy overhead measurement
- Circuit breaker and retry policy testing
- mTLS performance impact analysis

**Key Features**:
- Mesh-specific testing patterns
- Traffic management validation
- Security policy performance testing
- Observability impact measurement

---

### 🎭 [Chaos Engineering Testing](./chaos-engineering-testing.md)
**Target Audience**: Reliability engineers, chaos engineering practitioners

**Use Cases**:
- Resilience validation under load
- Cascading failure detection
- Recovery time measurement
- System stability testing

**Key Features**:
- Chaos + load testing integration
- Failure scenario simulation
- Resilience hypothesis validation
- Progressive chaos testing

---

### 📊 [Capacity Planning Agent](./capacity-planning-agent.md)
**Target Audience**: Infrastructure architects, capacity planners

**Use Cases**:
- Resource requirement calculation
- Auto-scaling threshold determination
- Growth planning and cost modeling
- SLA validation at scale

**Key Features**:
- Systematic capacity measurement
- Resource-specific testing methodologies
- Scaling threshold optimization
- Cost-performance analysis

## How to Use These Prompts

### 1. **Choose the Right Agent**
Select the agent prompt that best matches your testing goals and expertise level:
- **New to load testing?** → Start with Basic Load Testing
- **Testing microservices?** → Use Advanced Performance Testing
- **Using Istio/Linkerd?** → Choose Service Mesh Testing
- **Building resilient systems?** → Try Chaos Engineering Testing
- **Planning infrastructure?** → Use Capacity Planning Agent

### 2. **Setup Your MCP Connection**
Ensure you have access to the Fortio Load Generator MCP server:
```bash
# Check MCP server status
kubectl get mcpserver fortio-load-generator -n kagent

# Port forward for local access
kubectl port-forward service/fortio-load-generator 3000:3000 -n kagent
```

### 3. **Configure Your AI Agent**
Copy the chosen agent prompt and configure your AI system:
- Use the prompt as system instructions
- Ensure MCP tool access is configured
- Set appropriate safety parameters

### 4. **Start Testing**
Begin with discovery and work through the agent's methodology:
```
"Help me test the performance of our e-commerce platform"
```

## Common MCP Tools Reference

All agents have access to these Fortio MCP tools:

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `list_services` | Discover K8s services | `namespace` |
| `get_service_endpoints` | Get service details | `serviceName`, `namespace` |
| `check_service_health` | Verify service health | `serviceName`, `namespace` |
| `run_load_test` | Execute load test | `url`, `duration`, `connections`, `qps` |
| `create_load_profile` | Generate test profiles | `profileType`, `url`, `maxConnections` |
| `parse_test_results` | Analyze results | `rawResults`, `compareWith` |

## Safety Guidelines

All agents follow these safety principles:

### 🛡️ **Production Safety**
- Always start with health endpoints
- Begin with low load and increase gradually
- Test in staging before production
- Have abort procedures ready

### 📏 **Responsible Testing**
- Respect service resource limits
- Coordinate with service owners
- Monitor cluster resources during tests
- Clean up test data when applicable

### 🎯 **Effective Testing**
- Use realistic load patterns
- Test during appropriate time windows
- Monitor downstream dependencies
- Document and share results

## Customization

These prompts are designed to be customized for your specific environment:

### **Namespace Customization**
Update service discovery commands for your namespaces:
```bash
# Default examples use common namespaces
list_services(namespace="production")
list_services(namespace="staging")
```

### **URL Pattern Customization**
Modify URL patterns for your service naming conventions:
```bash
# Adapt to your DNS patterns
http://service.namespace.svc.cluster.local:port
http://service-name.environment.your-domain.com
```

### **Load Pattern Customization**
Adjust load patterns for your traffic characteristics:
```bash
# Modify for your typical traffic levels
connections=your_typical_concurrency
qps=your_peak_requests_per_second
```

## Contributing

To add new agent prompts or improve existing ones:

1. **Follow the established pattern**: Objective, Instructions, Examples, Safety
2. **Include specific MCP tool usage**: Show exact tool calls with parameters
3. **Provide realistic scenarios**: Use examples relevant to common use cases
4. **Emphasize safety**: Always include safety considerations and limitations
5. **Test thoroughly**: Validate prompts work with actual MCP server

## Support

For questions or issues:
- Check MCP server logs: `kubectl logs -l app.kubernetes.io/name=fortio-load-generator -n kagent`
- Verify MCP connectivity: Test with simple `echo` tool first
- Review agent prompt syntax: Ensure MCP tool calls match available schema
- Monitor cluster resources: Ensure sufficient capacity for load testing

---

*These agent prompts are designed to work with the Fortio Load Generator MCP server deployed in your Kubernetes cluster. They provide structured, safe, and effective approaches to performance testing while leveraging the full capabilities of the Fortio load testing tool.*# kubecon2025
