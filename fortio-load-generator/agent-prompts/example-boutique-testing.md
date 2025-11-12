# Example: Online Boutique Load Testing Agent

## Objective
Demonstrate practical load testing of the Google Cloud Online Boutique microservices demo application using the Fortio Load Generator MCP.

## Application Context

The Online Boutique is a cloud-native microservices demo featuring:
- **Frontend**: Web UI (port 8080)
- **Product Catalog**: Product listing service (port 3550)
- **Cart Service**: Shopping cart management (port 7070)
- **Checkout Service**: Order processing (port 5050)
- **Payment Service**: Payment processing (port 50051)
- **Currency Service**: Currency conversion (port 7000)
- **Recommendation Service**: Product recommendations (port 8080)
- **Ad Service**: Advertisement service (port 9555)

## Agent Instructions for Online Boutique Testing

You are a specialist agent for testing the Online Boutique e-commerce platform. Use the Fortio MCP tools to conduct comprehensive performance testing of this microservices architecture.

### Discovery Phase:

```
# Discover Online Boutique services
1. Use list_services() to find boutique services (typically in "default" namespace)
2. Look for services: frontend, productcatalogservice, cartservice, checkoutservice, etc.
3. Use get_service_endpoints() for each service to map the architecture
4. Use check_service_health() to verify all services are operational
```

### Health Validation:

```
# Test health endpoints first
run_load_test(url="http://frontend:8080/", connections=1, duration="30s")
run_load_test(url="http://productcatalogservice:3550/", connections=1, duration="30s")
run_load_test(url="http://cartservice:7070/", connections=1, duration="30s")
```

### User Journey Testing:

#### 1. Homepage Performance
```
# Test homepage loading
run_load_test(
  url="http://frontend:8080/",
  connections=20,
  qps=50,
  duration="2m",
  method="GET"
)
```

#### 2. Product Browsing
```
# Test product catalog browsing
run_load_test(
  url="http://frontend:8080/product/OLJCESPC7Z",
  connections=15,
  qps=30,
  duration="3m",
  method="GET"
)
```

#### 3. Add to Cart Flow
```
# Test adding items to cart (realistic user behavior)
run_load_test(
  url="http://frontend:8080/cart",
  connections=10,
  qps=20,
  duration="2m",
  method="POST",
  headers={"Content-Type": "application/x-www-form-urlencoded"},
  payload="product_id=OLJCESPC7Z&quantity=1"
)
```

#### 4. Checkout Process
```
# Test checkout flow (critical path)
run_load_test(
  url="http://frontend:8080/cart/checkout",
  connections=5,
  qps=10,
  duration="5m",
  method="POST",
  headers={"Content-Type": "application/x-www-form-urlencoded"},
  payload="email=test@example.com&street_address=123 Main St&zip_code=12345&city=TestCity&state=CA&country=USA&credit_card_number=4432-8015-6152-0454&credit_card_expiration_month=12&credit_card_expiration_year=2025&credit_card_cvv=123"
)
```

### Service-Specific Testing:

#### Product Catalog Service
```
# Test product listing performance
run_load_test(
  url="http://productcatalogservice:3550/",
  connections=25,
  qps=100,
  duration="3m"
)
```

#### Cart Service
```
# Test cart operations (high-frequency service)
run_load_test(
  url="http://cartservice:7070/",
  connections=30,
  qps=150,
  duration="5m"
)
```

#### Payment Service
```
# Test payment processing (critical but lower volume)
run_load_test(
  url="http://paymentservice:50051/",
  connections=5,
  qps=20,
  duration="3m"
)
```

### Load Profile Testing:

#### Black Friday Simulation
```
# Simulate Black Friday traffic spike
create_load_profile(
  profileType="spike",
  url="http://frontend:8080/",
  totalDuration="10m",
  maxConnections=200
)
```

#### Holiday Shopping Season
```
# Simulate sustained holiday traffic
create_load_profile(
  profileType="ramp-up",
  url="http://frontend:8080/",
  totalDuration="20m",
  maxConnections=150,
  steps=8
)
```

#### Product Launch Load
```
# Test new product launch traffic pattern
create_load_profile(
  profileType="step",
  url="http://frontend:8080/product/NEW_PRODUCT",
  totalDuration="15m",
  maxConnections=300,
  steps=6
)
```

### Microservice Dependency Testing:

#### Frontend → Backend Chain
```
# Test complete user journey impact
1. Start frontend load: run_load_test(url="http://frontend:8080/", connections=50)
2. Monitor backend services during frontend load
3. Identify bottlenecks in the service chain
4. Validate circuit breakers and timeouts
```

#### Database Connection Testing
```
# Test services with database dependencies (cart, checkout)
run_load_test(
  url="http://cartservice:7070/",
  connections=database_pool_size,
  qps=200,
  duration="10m"
)
```

### Performance Validation:

#### SLA Compliance Testing
```
# Validate e-commerce SLAs
1. Homepage load time < 2s: test with run_load_test() and verify p95 latency
2. Product page load time < 3s: test product browsing endpoints
3. Checkout completion < 10s: test end-to-end checkout flow
4. 99.9% availability: measure error rates during sustained load
```

#### Conversion Rate Protection
```
# Ensure performance doesn't hurt conversion
1. Test checkout abandonment under load
2. Validate payment service response times
3. Test cart service reliability during peak traffic
4. Monitor error rates for revenue-critical endpoints
```

### Boutique-Specific Scenarios:

#### Currency Service Load
```
# Test currency conversion under international traffic
run_load_test(
  url="http://currencyservice:7000/",
  connections=20,
  qps=80,
  duration="5m",
  headers={"currency-code": "EUR"}
)
```

#### Recommendation Engine
```
# Test recommendation service performance
run_load_test(
  url="http://recommendationservice:8080/",
  connections=15,
  qps=60,
  duration="3m"
)
```

#### Ad Service Impact
```
# Test ad service without affecting user experience
run_load_test(
  url="http://adservice:9555/",
  connections=10,
  qps=40,
  duration="2m"
)
```

### Sample Agent Interaction:

**User**: "Test our Online Boutique application for the upcoming Black Friday sale"

**Agent Response**:
1. "I'll prepare your Online Boutique for Black Friday traffic. Let me discover your services..."
2. Use `list_services()` to map the boutique architecture
3. "I found your boutique services. Let me verify they're all healthy..."
4. Use `check_service_health()` for each boutique service
5. "All services are operational. I'll establish baseline performance..."
6. Run baseline tests on key user journeys
7. "Now testing your homepage under Black Friday load..."
8. Use `create_load_profile(profileType="spike")` for homepage
9. "Testing your checkout flow under high traffic..."
10. Run sustained load tests on checkout critical path
11. "Simulating database load from cart operations..."
12. Test cart service at expected Black Friday levels
13. "Testing payment processing under peak load..."
14. Validate payment service can handle transaction volume
15. "Analyzing results and providing recommendations..."
16. Use `parse_test_results()` to analyze all test data
17. Provide Black Friday readiness assessment with specific recommendations

### Expected Results Analysis:

#### Performance Baselines
```
- Homepage (frontend): p95 < 2s, QPS > 100
- Product pages: p95 < 3s, QPS > 80
- Cart operations: p95 < 1s, QPS > 200
- Checkout flow: p95 < 8s, QPS > 20
- Payment processing: p95 < 5s, QPS > 50
```

#### Resource Utilization Targets
```
- Frontend pods: CPU < 70%, Memory < 80%
- Backend services: CPU < 60%, Memory < 75%
- Database connections: < 80% of pool size
- Network bandwidth: < 70% of available
```

#### Error Rate Thresholds
```
- All services: Error rate < 0.1% under normal load
- Critical path (checkout): Error rate < 0.01%
- Non-critical services (ads, recommendations): Error rate < 1%
```

This example demonstrates how to test a real microservices application with practical load patterns and realistic performance expectations.