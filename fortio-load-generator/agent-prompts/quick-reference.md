# Quick Reference: Fortio MCP Agent Patterns

## 🚀 Common Agent Workflows

### Service Discovery Pattern
```
1. list_namespaces() → Find relevant namespaces
2. list_services(namespace="target") → Discover services
3. get_service_endpoints(serviceName="service") → Get service details
4. check_service_health(serviceName="service") → Verify health
```

### Progressive Load Testing Pattern
```
1. run_load_test(connections=1) → Single user baseline
2. run_load_test(connections=5) → Light load
3. run_load_test(connections=25) → Medium load
4. run_load_test(connections=100) → Heavy load
5. create_load_profile(profileType="step") → Find limits
```

### Service Validation Pattern
```
1. Health endpoint: run_load_test(url="http://service:port/health")
2. Read operations: run_load_test(url="http://service:port/api/data")
3. Write operations: run_load_test(method="POST", payload="data")
4. Error handling: run_load_test(url="http://service:port/invalid")
```

## 🛠️ Tool Quick Reference

### Essential Discovery Tools
| Tool | Usage | Example |
|------|-------|---------|
| `list_services` | Find services | `list_services(namespace="default")` |
| `get_service_endpoints` | Service details | `get_service_endpoints(serviceName="api")` |
| `check_service_health` | Health check | `check_service_health(serviceName="api")` |

### Core Load Testing Tools
| Tool | Usage | Example |
|------|-------|---------|
| `run_load_test` | Basic load test | `run_load_test(url="http://api:8080", connections=10)` |
| `create_load_profile` | Advanced patterns | `create_load_profile(profileType="spike", url="http://api:8080")` |
| `parse_test_results` | Result analysis | `parse_test_results(rawResults="test_output")` |

## 📋 Common Parameters

### Load Test Parameters
```bash
# Basic parameters
url="http://service.namespace.svc.cluster.local:port/path"
duration="30s" | "1m" | "5m" | "10m"
connections=1 | 5 | 10 | 25 | 50 | 100
qps=10 | 50 | 100 | 500 | 1000

# HTTP parameters
method="GET" | "POST" | "PUT" | "DELETE" | "PATCH"
headers={"Content-Type": "application/json", "Authorization": "Bearer token"}
payload='{"key": "value"}' | "form=data&key=value"
timeout="3s" | "5s" | "10s"
```

### Load Profile Types
```bash
profileType="constant"   # Steady load throughout test
profileType="ramp-up"    # Gradual increase to maximum
profileType="spike"      # Sudden traffic spike
profileType="step"       # Incremental load increases
```

## 🎯 URL Patterns

### Kubernetes Service URLs
```bash
# Same namespace
"http://service-name:port/path"

# Different namespace
"http://service-name.namespace:port/path"

# Fully qualified
"http://service-name.namespace.svc.cluster.local:port/path"

# With subdomain
"http://api.service.namespace.svc.cluster.local:8080/v1/users"
```

### Common Service Ports
```bash
# HTTP services
:8080   # Common web service port
:3000   # Node.js applications
:8000   # Python/Django applications
:9090   # Prometheus, monitoring services

# Database services
:5432   # PostgreSQL
:3306   # MySQL
:27017  # MongoDB
:6379   # Redis

# gRPC services
:50051  # Default gRPC port
:9090   # gRPC web services
```

## ⚡ Load Testing Recipes

### Quick Health Check
```bash
run_load_test(
  url="http://service:8080/health",
  connections=1,
  duration="30s"
)
```

### API Endpoint Test
```bash
run_load_test(
  url="http://api:8080/v1/users",
  connections=20,
  qps=50,
  duration="2m",
  method="GET",
  headers={"Authorization": "Bearer test-token"}
)
```

### Database Load Test
```bash
run_load_test(
  url="http://api:8080/v1/data",
  connections=10,
  qps=30,
  duration="5m",
  timeout="10s"
)
```

### POST Request Test
```bash
run_load_test(
  url="http://api:8080/v1/users",
  method="POST",
  connections=15,
  qps=25,
  duration="3m",
  headers={"Content-Type": "application/json"},
  payload='{"name": "test", "email": "test@example.com"}'
)
```

### Spike Test
```bash
create_load_profile(
  profileType="spike",
  url="http://service:8080/api/endpoint",
  totalDuration="5m",
  maxConnections=100
)
```

### Capacity Test
```bash
create_load_profile(
  profileType="step",
  url="http://service:8080",
  totalDuration="15m",
  maxConnections=500,
  steps=10
)
```

## 🔍 Common Debugging

### Connection Issues
```bash
# Test basic connectivity
run_load_test(url="http://service:8080", connections=1, duration="10s")

# Check DNS resolution
run_load_test(url="http://service.namespace.svc.cluster.local:8080")

# Verify port and protocol
get_service_endpoints(serviceName="service", namespace="namespace")
```

### Performance Issues
```bash
# Check single user performance
run_load_test(connections=1, duration="1m")

# Test with timeouts
run_load_test(timeout="5s")

# Gradual load increase
create_load_profile(profileType="ramp-up", steps=5)
```

### Error Troubleshooting
```bash
# Low connection test
run_load_test(connections=1, qps=1)

# Check service health
check_service_health(serviceName="service")

# Verify endpoints
get_service_endpoints(serviceName="service")
```

## 🛡️ Safety Checks

### Before Testing
```bash
1. check_service_health() → Verify service is healthy
2. Test with connections=1 first
3. Start with short duration (30s)
4. Use health endpoints before business logic
```

### During Testing
```bash
1. Monitor error rates in results
2. Watch for timeout increases
3. Check resource utilization if possible
4. Be ready to reduce load or stop
```

### After Testing
```bash
1. parse_test_results() → Analyze performance
2. Verify services returned to normal
3. Check for any persistent issues
4. Document results and learnings
```

## 📊 Result Interpretation

### Good Performance Indicators
```bash
- Error rate < 1%
- p95 latency < 2x p50 latency
- Consistent throughput throughout test
- Resource utilization < 80%
```

### Warning Signs
```bash
- Error rate > 5%
- p99 latency > 10x p50 latency
- Declining throughput over time
- Memory/connection leaks
```

### Critical Issues
```bash
- Error rate > 20%
- Complete service unavailability
- Cascading failures to other services
- Resource exhaustion
```

This quick reference provides the essential patterns and commands needed to effectively use the Fortio Load Generator MCP server for testing Kubernetes services.