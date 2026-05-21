import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const incidentsData = [
  { title: "Database Connection Pool Exhausted", description: "Production DB is rejecting connections due to high concurrency.", status: "OPEN", priority: "CRITICAL", createdAt: "2026-02-19T10:00:00Z" },
  { title: "Slow Response Times - Auth API", description: "Latency increased to 2s for login requests in US-East region.", status: "INVESTIGATING", priority: "HIGH", createdAt: "2026-02-19T09:45:00Z" },
  { title: "S3 Bucket Permission Error", description: "Access denied for image uploads in the staging environment.", status: "RESOLVED", priority: "MEDIUM", createdAt: "2026-02-18T14:20:00Z" },
  { title: "Memory Leak in Socket.io Worker", description: "Worker node restarted 5 times in the last hour due to OOM.", status: "MONITORING", priority: "HIGH", createdAt: "2026-02-19T08:10:00Z" },
  { title: "Expired SSL Certificate", description: "Staging domain cert expired this morning.", status: "IDENTIFIED", priority: "LOW", createdAt: "2026-02-19T07:00:00Z" },
  // ... (Adding the rest of your 45 records here internally)
  { title: "Redis Cache Miss Spike", description: "Cache hit rate dropped below 40% on main product page.", status: "OPEN", priority: "MEDIUM", createdAt: "2026-02-19T11:30:00Z" },
  { title: "Payment Gateway Timeout", description: "Stripe API responding with 504 on checkout attempts.", status: "OPEN", priority: "CRITICAL", createdAt: "2026-02-19T12:05:00Z" },
  { title: "Email Delivery Delay", description: "SendGrid reports 20-minute delay for transactional emails.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-17T16:45:00Z" },
  { title: "Broken CSS on Dashboard", description: "Footer overlapping content in Safari mobile.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-16T11:00:00Z" },
  { title: "High CPU on ElasticSearch", description: "Search node 3 is consistently at 95% utilization.", status: "INVESTIGATING", priority: "HIGH", createdAt: "2026-02-19T05:22:00Z" },
  { title: "Deadlock in Migration Script", description: "Recent schema update locked the Users table.", status: "IDENTIFIED", priority: "CRITICAL", createdAt: "2026-02-18T22:15:00Z" },
  { title: "Unexpected AWS Bill Spike", description: "Data transfer costs for CloudFront doubled yesterday.", status: "MONITORING", priority: "MEDIUM", createdAt: "2026-02-18T09:00:00Z" },
  { title: "DNS Propagation Issue", description: "Subdomain 'api-old' failing to resolve globally.", status: "RESOLVED", priority: "MEDIUM", createdAt: "2026-02-15T13:40:00Z" },
  { title: "Webhook Retries Failing", description: "Customer hooks failing after 3 retries due to local timeout.", status: "OPEN", priority: "MEDIUM", createdAt: "2026-02-19T13:15:00Z" },
  { title: "Incorrect User Profile Image", description: "Avatars showing default instead of uploaded files.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-14T10:30:00Z" },
  { title: "Kafka Partition Lag", description: "Consumer group 'analytics' is behind by 500k messages.", status: "INVESTIGATING", priority: "HIGH", createdAt: "2026-02-19T02:45:00Z" },
  { title: "Rate Limit Hits - Github API", description: "CI/CD pipelines failing due to excessive API calls.", status: "IDENTIFIED", priority: "MEDIUM", createdAt: "2026-02-18T18:20:00Z" },
  { title: "Malformed JSON in API Response", description: "GET /api/v1/orders returning invalid trailing comma.", status: "RESOLVED", priority: "HIGH", createdAt: "2026-02-17T09:12:00Z" },
  { title: "Broken Link in Welcome Email", description: "Unsubscribe link leads to 404.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-13T15:00:00Z" },
  { title: "Unauthorized Access Attempt", description: "Spike in login failures from IP 192.x.x.x.", status: "MONITORING", priority: "CRITICAL", createdAt: "2026-02-18T23:55:00Z" },
  { title: "Internal 500 on Health Check", description: "Kubernetes liveness probe failing on pods in zone-b.", status: "OPEN", priority: "HIGH", createdAt: "2026-02-19T14:30:00Z" },
  { title: "Slow Disk I/O on Log Server", description: "Logstash cannot keep up with input stream.", status: "INVESTIGATING", priority: "MEDIUM", createdAt: "2026-02-19T01:10:00Z" },
  { title: "API Documentation Outdated", description: "Endpoints for v2 don't match the Swagger spec.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-12T12:00:00Z" },
  { title: "Missing Translations in Dashboard", description: "Spanish locale showing English strings for buttons.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-11T09:45:00Z" },
  { title: "WebSocket Connection Dropping", description: "Clients disconnected every 60s in production.", status: "IDENTIFIED", priority: "HIGH", createdAt: "2026-02-18T11:20:00Z" },
  { title: "Incorrect Password Reset Link", description: "Links expiring in 1 minute instead of 1 hour.", status: "RESOLVED", priority: "HIGH", createdAt: "2026-02-16T17:30:00Z" },
  { title: "Orphaned Docker Volumes", description: "Cleanup script failing on node-04.", status: "MONITORING", priority: "LOW", createdAt: "2026-02-18T05:15:00Z" },
  { title: "Stale Data in Search Results", description: "Elasticsearch sync failing for deleted products.", status: "OPEN", priority: "MEDIUM", createdAt: "2026-02-19T15:00:00Z" },
  { title: "PDF Generation Failure", description: "Invoices failing to generate for large orders.", status: "INVESTIGATING", priority: "MEDIUM", createdAt: "2026-02-19T06:40:00Z" },
  { title: "Global Search Returning 500", description: "Specific keywords causing backend crash.", status: "IDENTIFIED", priority: "HIGH", createdAt: "2026-02-18T20:00:00Z" },
  { title: "Database Schema Mismatch", description: "Prisma client out of sync with production DB.", status: "RESOLVED", priority: "CRITICAL", createdAt: "2026-02-17T21:10:00Z" },
  { title: "Broken Image Uploads on Mobile", description: "Android app crashes when selecting high-res photos.", status: "RESOLVED", priority: "MEDIUM", createdAt: "2026-02-14T08:20:00Z" },
  { title: "Server Restart - Maintenance", description: "Planned reboot of staging instance.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-10T11:00:00Z" },
  { title: "New Team Member Onboarding", description: "Creating accounts for the devops team.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-09T09:00:00Z" },
  { title: "API Rate Limit Violation", description: "Internal tool hitting the 100 req/s limit.", status: "MONITORING", priority: "MEDIUM", createdAt: "2026-02-18T13:45:00Z" },
  { title: "Invalid Token for Mobile Push", description: "FCM tokens for iOS devices expiring early.", status: "OPEN", priority: "HIGH", createdAt: "2026-02-19T16:20:00Z" },
  { title: "UI Bug - Chart Overflow", description: "Incident graph spilling out of its container.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-15T18:30:00Z" },
  { title: "Slow CI/CD Builds", description: "Build times increased from 5m to 15m.", status: "INVESTIGATING", priority: "LOW", createdAt: "2026-02-19T07:15:00Z" },
  { title: "Data Corruption in CSV Export", description: "UTF-8 characters not rendering in Excel.", status: "IDENTIFIED", priority: "MEDIUM", createdAt: "2026-02-18T16:50:00Z" },
  { title: "Third Party Library Vulnerability", description: "CVE-2026 detected in 'lodash'.", status: "RESOLVED", priority: "CRITICAL", createdAt: "2026-02-16T10:00:00Z" },
  { title: "Slack Integration Offline", description: "Notifications not being sent to #ops-alerts.", status: "OPEN", priority: "HIGH", createdAt: "2026-02-19T17:05:00Z" },
  { title: "Internal Dashboard Access Denied", description: "VPN issue preventing team access.", status: "INVESTIGATING", priority: "CRITICAL", createdAt: "2026-02-19T04:55:00Z" },
  { title: "Documentation Spelling Error", description: "Typo in the API authentication guide.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-08T11:00:00Z" },
  { title: "Background Job Stuck", description: "Cron job for daily cleanup has been running for 5 hours.", status: "OPEN", priority: "MEDIUM", createdAt: "2026-02-19T17:40:00Z" },
  { title: "Old API Endpoint Retirement", description: "Shutting down the deprecated v1 auth service.", status: "RESOLVED", priority: "LOW", createdAt: "2026-02-07T09:00:00Z" }
];

async function main() {
  console.log("Starting seed...");

  // 1. Create a Seed User using upsert (prevents duplicates)
  const seedUser = await prisma.user.upsert({
    where: { email: 'admin@opsmonitor.com' },
    update: {},
    create: {
      email: 'admin@opsmonitor.com',
      password: 'password123', // Remember to hash in production!
      username: 'System Admin',
      role: 'ADMIN',
      updatedAt: new Date(),
    },
  });

  console.log(`Using reporter: ${seedUser.username}`);

  // 2. Clear old incidents (optional - remove if you want to keep them)
  await prisma.incident.deleteMany({});

  // 3. Batch create incidents
  for (const item of incidentsData) {
    await prisma.incident.create({
      data: {
        title: item.title,
        description: item.description,
        status: item.status,
        priority: item.priority,
        reporterId: seedUser.userId,
        createdAt: new Date(item.createdAt),
        resolvedAt: item.status === "RESOLVED" ? new Date() : null,
      },
    });
  }

  console.log(`Seeded ${incidentsData.length} incidents successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });