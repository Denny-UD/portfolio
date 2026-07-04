/**
 * MOCK DATA DISCLAIMER
 * All data in this file is either mock, simulated, or statically defined.
 * No real backend APIs are called. Any metrics, logs, or "live" data shown
 * are generated client-side with seeded randomness or static content.
 * This is a portfolio demonstration, not a production monitoring system.
 */

export interface MetricWidget {
  label: string
  value: string
  unit: string
  trend: "up" | "down" | "stable"
  status: "healthy" | "warning" | "critical"
  details: string
}

export interface DeploymentLog {
  timestamp: string
  service: string
  action: string
  status: "success" | "pending" | "error"
  duration: string
}

export interface ExperienceEntry {
  id: string
  version: string
  date: string
  role: string
  company: string
  deploymentNotes: string[]
  metrics: string[]
}

export interface ProjectEntry {
  id: string
  name: string
  status: "production" | "maintenance" | "archived"
  problem: string
  solution: string
  technologies: string[]
  impact: string
  metrics: string[]
}

export interface StackItem {
  name: string
  category: string
  proficiency: number // 0-100
  experience: string
  projects: string[]
  logo?: string
}

export interface ArchitectureDiagram {
  id: string
  title: string
  type: string
  nodes: ArchNode[]
  edges: ArchEdge[]
}

export interface ArchNode {
  id: string
  label: string
  type: "service" | "database" | "queue" | "gateway" | "monitoring" | "storage" | "compute" | "network"
  x: number
  y: number
}

export interface ArchEdge {
  from: string
  to: string
  label?: string
}

export interface CertificationEntry {
  name: string
  code: string
  issuer: string
  issueDate: string
  expiryDate?: string
  verifyUrl: string
  badgeColor: string
}

export interface BlogEntry {
  id: string
  title: string
  excerpt: string
  tags: string[]
  readTime: string
  published: boolean
}

export interface ContactInfo {
  platform: string
  handle: string
  url: string
  icon: string
}

// ===== MOCK DASHBOARD METRICS =====
export const dashboardMetrics: MetricWidget[] = [
  { label: "Total Experience", value: "3+", unit: "Years", trend: "up", status: "healthy", details: "Cloud & DevOps Engineering" },
  { label: "Cloud Platforms", value: "2", unit: "AWS · Azure", trend: "stable", status: "healthy", details: "Multi-cloud certified" },
  { label: "Certifications", value: "2", unit: "Active", trend: "stable", status: "healthy", details: "AWS SAA-C03 · Azure AZ-104" },
  { label: "Infrastructure Managed", value: "100+", unit: "Servers", trend: "up", status: "healthy", details: "IaC with Terraform" },
  { label: "Microservices", value: "50+", unit: "Containerized", trend: "up", status: "healthy", details: "Kubernetes (EKS/AKS)" },
  { label: "CI/CD Pipelines", value: "50+", unit: "Built", trend: "up", status: "healthy", details: "Jenkins · GitHub Actions · Azure DevOps" },
  { label: "Uptime SLA", value: "99.9", unit: "%", trend: "stable", status: "healthy", details: "Production workloads" },
  { label: "MTTD Improvement", value: "50", unit: "%", trend: "down", status: "healthy", details: "Observability stack" },
]

// ===== MOCK DEPLOYMENT LOGS =====
export const deploymentLogs: DeploymentLog[] = [
  { timestamp: "2024-10-15T14:30:00Z", service: "terraform-drift-bot", action: "deploy:lambda", status: "success", duration: "12.4s" },
  { timestamp: "2024-10-15T14:28:00Z", service: "ai-health-report", action: "deploy:ecr", status: "success", duration: "45.2s" },
  { timestamp: "2024-10-15T14:25:00Z", service: "kube-platform", action: "rollout:eks", status: "success", duration: "2m 34s" },
  { timestamp: "2024-10-15T13:15:00Z", service: "cost-optimizer", action: "deploy:function", status: "success", duration: "8.1s" },
  { timestamp: "2024-10-15T12:00:00Z", service: "monitoring-stack", action: "update:grafana", status: "success", duration: "1m 12s" },
  { timestamp: "2024-10-15T11:45:00Z", service: "dr-automation", action: "test:failover", status: "success", duration: "3m 05s" },
  { timestamp: "2024-10-15T10:30:00Z", service: "kube-platform", action: "scale:hpa", status: "success", duration: "18.7s" },
  { timestamp: "2024-10-15T09:00:00Z", service: "ci-pipeline", action: "build:frontend", status: "success", duration: "5m 22s" },
]

// ===== EXPERIENCE DATA (Deployment Log style) =====
export const experienceEntries: ExperienceEntry[] = [
  {
    id: "deploy-001",
    version: "3.2.1",
    date: "Feb 2023 – Present",
    role: "Cloud & DevOps Engineer",
    company: "To The New Limited",
    deploymentNotes: [
      "Designed and managed AWS/Azure production infrastructure across multi-tenant distributed systems",
      "Implemented IAM security policies and VPC configurations for secure inter-service communication",
      "Built end-to-end CI/CD pipelines using Jenkins, GitHub Actions, Azure DevOps with blue-green and canary deployment strategies",
      "Provisioned 100% of cloud infrastructure via Terraform IaC with Git version control, eliminating configuration drift",
    ],
    metrics: [
      "Maintained 99.9% uptime SLA across production workloads",
      "Reduced deployment cycle time by 35%",
      "Reduced deployment failure rate by 30%",
      "Reduced infrastructure costs by 20%",
      "Reduced MTTD by 50% and MTTR by 40%",
      "Reduced manual operational effort by 40%",
    ],
  },
]

// ===== PROJECTS DATA =====
export const projects: ProjectEntry[] = [
  {
    id: "proj-001",
    name: "AI-Powered Infrastructure Health Reporting System",
    status: "production",
    problem: "Manual health checks across 50+ containerized services required 2+ engineer-hours daily, causing delayed incident detection and analysis paralysis during outages.",
    solution: "Built automated pipeline aggregating health metrics from AWS CloudWatch, Datadog, and Kubernetes APIs. Integrated Anthropic Claude LLM with custom ML models to auto-generate anomaly summaries with multi-environment HTML reports.",
    technologies: ["Python", "AWS Lambda", "CloudWatch", "Datadog API", "Claude API", "Kubernetes", "S3", "SNS"],
    impact: "Reduced detection and analysis time by 75%, enabled engineers to triage critical issues in under 2 minutes, eliminated daily manual health-check overhead.",
    metrics: ["75% faster anomaly detection", "2 engineer-hours/day recovered", "50+ services monitored", "Real-time status indicators"],
  },
  {
    id: "proj-002",
    name: "Terraform Drift Detection & Auto-Remediation Bot",
    status: "production",
    problem: "Undetected infrastructure drift caused configuration inconsistencies, audit failures, and hard-to-debug production issues across 30+ Terraform-managed resources.",
    solution: "Developed AWS Lambda function running terraform plan in read-only mode, detecting drift and auto-raising GitHub PRs with corrective diffs. Implemented Git-based infrastructure reviews with SNS alerting.",
    technologies: ["Python", "Terraform", "AWS Lambda", "GitHub Actions", "SNS", "Git", "IAM"],
    impact: "Eliminated 100% of undetected infrastructure changes within two weeks, maintained zero drift-related incidents over 6+ months, achieved 95% automated remediation rate.",
    metrics: ["Zero drift incidents (6+ months)", "100% undetected change elimination", "95% auto-remediation rate", "30+ resources monitored"],
  },
  {
    id: "proj-003",
    name: "Azure Multi-Subscription Cost Optimization Platform",
    status: "production",
    problem: "Multi-subscription Azure environment lacked centralized cost visibility, making it impossible to track spending patterns, identify waste, or enforce budget governance across teams.",
    solution: "Built cost analysis platform using Azure Monitor, Resource Graph, and Python. Created centralized dashboards with subscription-level breakdowns, anomaly detection, and automated cost optimization recommendations.",
    technologies: ["Python", "Azure Monitor", "Azure Resource Graph", "Power BI", "Azure Functions", "Cost Management API"],
    impact: "Provided full cost visibility across multiple Azure subscriptions, enabling proactive budget management and resource right-sizing decisions.",
    metrics: ["Multi-subscription coverage", "Automated cost anomaly detection", "Centralized dashboard visibility"],
  },
  {
    id: "proj-004",
    name: "Enterprise Kubernetes Platform",
    status: "production",
    problem: "Teams needed a standardized, production-grade Kubernetes platform on EKS/AKS with consistent networking, security policies, and automated scaling for 50+ microservices.",
    solution: "Provisioned EKS and AKS clusters with Helm charts, HPA, cluster autoscaling, pod security policies, and Network Policies. Implemented GitOps with ArgoCD for continuous deployment synchronization.",
    technologies: ["EKS", "AKS", "Helm", "ArgoCD", "HPA", "Docker", "Terraform", "Ingress Controller", "Cert-Manager"],
    impact: "Supported 50+ containerized microservices with high availability, automated scaling, and security-compliant least-privilege access patterns across production clusters.",
    metrics: ["50+ microservices supported", "Automated HPA scaling", "Security-compliant pod policies", "GitOps continuous sync"],
  },
  {
    id: "proj-005",
    name: "Production Monitoring & Observability Platform",
    status: "production",
    problem: "100+ servers lacked centralized monitoring, making incident response reactive and slow. Teams had no unified view of system health, leading to prolonged MTTD/MTTR.",
    solution: "Deployed full-stack observability stack: Prometheus + Grafana for metrics, ELK Stack for log aggregation, Datadog for APM, and CloudWatch for AWS-native monitoring. Built automated alerting with anomaly detection.",
    technologies: ["Prometheus", "Grafana", "Datadog", "ELK Stack", "CloudWatch", "Alertmanager", "Python"],
    impact: "Reduced MTTD by 50% and MTTR by 40% across the infrastructure estate. Enabled automated alerting with intelligent anomaly detection, cutting manual monitoring effort significantly.",
    metrics: ["50% MTTD reduction", "40% MTTR reduction", "100+ servers monitored", "Automated anomaly detection"],
  },
  {
    id: "proj-006",
    name: "Disaster Recovery Planning Automation",
    status: "production",
    problem: "Manual DR processes were error-prone and time-consuming. Recovery readiness was uncertain, RTO/RPO targets were at risk, and compliance audits required extensive manual documentation.",
    solution: "Automated backup validation workflows and recovery readiness documentation generation. Implemented HA failover testing with RTO < 15 minutes and RPO < 1 hour. Created automated recovery playbooks for critical services.",
    technologies: ["AWS Backup", "Azure Site Recovery", "Terraform", "Python", "Bash", "CloudWatch", "Lambda"],
    impact: "Achieved RTO < 15 minutes and RPO < 1 hour for critical services. Automated DR documentation eliminated manual audit prep and ensured business continuity across all environments.",
    metrics: ["RTO < 15 minutes", "RPO < 1 hour", "Automated recovery playbooks", "Compliant DR documentation"],
  },
]

// ===== TECH STACK DATA =====
export const techStack: StackItem[] = [
  // Cloud
  { name: "AWS", category: "Cloud Platforms", proficiency: 92, experience: "3+ years", projects: ["All production workloads", "EKS, RDS, Lambda, S3, CloudWatch"] },
  { name: "Azure", category: "Cloud Platforms", proficiency: 85, experience: "2+ years", projects: ["AKS, Key Vault, NSG, VNet", "Cost Optimization Platform"] },
  { name: "GCP", category: "Cloud Platforms", proficiency: 40, experience: "Exploratory", projects: ["Learning & experimentation"] },
  // Containers
  { name: "Docker", category: "Containers & Orchestration", proficiency: 95, experience: "3+ years", projects: ["50+ microservices containerized", "All projects"] },
  { name: "Kubernetes", category: "Containers & Orchestration", proficiency: 90, experience: "3+ years", projects: ["EKS, AKS, Helm, HPA", "Enterprise K8s Platform"] },
  { name: "Helm", category: "Containers & Orchestration", proficiency: 85, experience: "2+ years", projects: ["Chart management", "K8s deployments"] },
  // IaC
  { name: "Terraform", category: "Infrastructure as Code", proficiency: 95, experience: "3+ years", projects: ["100% IaC coverage", "Drift Detection Bot", "All infrastructure"] },
  { name: "CloudFormation", category: "Infrastructure as Code", proficiency: 70, experience: "1+ years", projects: ["AWS native IaC", "Legacy migrations"] },
  { name: "Ansible", category: "Infrastructure as Code", proficiency: 75, experience: "2+ years", projects: ["Configuration management", "Server onboarding"] },
  // CI/CD
  { name: "Jenkins", category: "CI/CD & Deployment", proficiency: 88, experience: "3+ years", projects: ["Pipeline automation", "All environments"] },
  { name: "GitHub Actions", category: "CI/CD & Deployment", proficiency: 90, experience: "3+ years", projects: ["Drift Detection Bot", "CI/CD pipelines"] },
  { name: "GitLab CI/CD", category: "CI/CD & Deployment", proficiency: 75, experience: "1+ years", projects: ["Multi-project pipelines"] },
  { name: "Azure DevOps", category: "CI/CD & Deployment", proficiency: 82, experience: "2+ years", projects: ["Azure pipeline automation"] },
  { name: "ArgoCD", category: "CI/CD & Deployment", proficiency: 80, experience: "1+ years", projects: ["GitOps continuous sync"] },
  // Observability
  { name: "Prometheus", category: "Observability", proficiency: 92, experience: "3+ years", projects: ["Monitoring Platform", "Metrics collection"] },
  { name: "Grafana", category: "Observability", proficiency: 90, experience: "3+ years", projects: ["Dashboards", "Alerting"] },
  { name: "Datadog", category: "Observability", proficiency: 85, experience: "2+ years", projects: ["APM, logs, infra monitoring"] },
  { name: "ELK Stack", category: "Observability", proficiency: 80, experience: "2+ years", projects: ["Log aggregation", "Centralized logging"] },
  { name: "CloudWatch", category: "Observability", proficiency: 90, experience: "3+ years", projects: ["AWS monitoring", "Health reports"] },
  { name: "Azure Monitor", category: "Observability", proficiency: 78, experience: "2+ years", projects: ["Cost optimization platform"] },
  // Data & Messaging
  { name: "MySQL", category: "Data & Messaging", proficiency: 75, experience: "2+ years", projects: ["RDS, Aurora", "Production databases"] },
  { name: "PostgreSQL", category: "Data & Messaging", proficiency: 72, experience: "2+ years", projects: ["Production workloads"] },
  { name: "Redis", category: "Data & Messaging", proficiency: 65, experience: "1+ years", projects: ["Caching layer"] },
  { name: "Kafka", category: "Data & Messaging", proficiency: 60, experience: "1+ years", projects: ["Event streaming"] },
  { name: "RabbitMQ", category: "Data & Messaging", proficiency: 55, experience: "1+ years", projects: ["Message queuing"] },
  // Languages
  { name: "Python", category: "Languages", proficiency: 92, experience: "3+ years", projects: ["Automation scripts", "Lambda functions", "AI integrations"] },
  { name: "Bash", category: "Languages", proficiency: 88, experience: "3+ years", projects: ["Automation scripts", "Server onboarding"] },
  // Networking & Security
  { name: "VPC/VNet", category: "Networking & Security", proficiency: 90, experience: "3+ years", projects: ["Multi-tier networking", "Secure topologies"] },
  { name: "IAM", category: "Networking & Security", proficiency: 92, experience: "3+ years", projects: ["Role-based access", "Security policies"] },
  { name: "Load Balancer", category: "Networking & Security", proficiency: 85, experience: "3+ years", projects: ["ALB, NLB", "Traffic distribution"] },
  { name: "DNS", category: "Networking & Security", proficiency: 82, experience: "2+ years", projects: ["Route 53", "DNS management"] },
  { name: "Secrets Management", category: "Networking & Security", proficiency: 85, experience: "2+ years", projects: ["Key Vault, Secrets Manager"] },
  { name: "WAF", category: "Networking & Security", proficiency: 70, experience: "1+ years", projects: ["Web application firewall"] },
]

// ===== ARCHITECTURE DIAGRAMS DATA =====
export const architectureDiagrams: ArchitectureDiagram[] = [
  {
    id: "arch-aws",
    title: "AWS Production Architecture",
    type: "cloud",
    nodes: [
      { id: "route53", label: "Route 53\nDNS", type: "network", x: 50, y: 10 },
      { id: "cloudfront", label: "CloudFront\nCDN", type: "network", x: 30, y: 25 },
      { id: "alb", label: "ALB\nLoad Balancer", type: "gateway", x: 50, y: 40 },
      { id: "ecs", label: "EKS Cluster\n(50+ Services)", type: "compute", x: 35, y: 60 },
      { id: "rds", label: "RDS Aurora\nMySQL", type: "database", x: 65, y: 55 },
      { id: "elasticache", label: "ElastiCache\nRedis", type: "database", x: 65, y: 70 },
      { id: "s3", label: "S3\nObject Storage", type: "storage", x: 15, y: 70 },
      { id: "lambda", label: "Lambda\nServerless", type: "compute", x: 20, y: 55 },
      { id: "cloudwatch", label: "CloudWatch\nMonitoring", type: "monitoring", x: 50, y: 85 },
    ],
    edges: [
      { from: "route53", to: "cloudfront", label: "DNS" },
      { from: "cloudfront", to: "alb", label: "HTTPS" },
      { from: "alb", to: "ecs", label: "Traffic" },
      { from: "ecs", to: "rds", label: "SQL" },
      { from: "ecs", to: "elasticache", label: "Cache" },
      { from: "ecs", to: "s3", label: "Objects" },
      { from: "lambda", to: "s3", label: "Events" },
      { from: "ecs", to: "cloudwatch", label: "Metrics" },
      { from: "lambda", to: "cloudwatch", label: "Logs" },
    ],
  },
  {
    id: "arch-cicd",
    title: "CI/CD Pipeline Architecture",
    type: "pipeline",
    nodes: [
      { id: "git", label: "GitHub\nSource Control", type: "storage", x: 10, y: 30 },
      { id: "jenkins", label: "Jenkins\nCI Server", type: "compute", x: 30, y: 30 },
      { id: "docker", label: "Docker\nBuild & Push", type: "compute", x: 50, y: 20 },
      { id: "ecr", label: "ECR/ACR\nRegistry", type: "storage", x: 70, y: 20 },
      { id: "terraform", label: "Terraform\nIaC Provision", type: "compute", x: 50, y: 45 },
      { id: "k8s", label: "Kubernetes\nRollout", type: "compute", x: 70, y: 45 },
      { id: "argo", label: "ArgoCD\nGitOps Sync", type: "compute", x: 30, y: 55 },
      { id: "prom", label: "Prometheus\nMonitoring", type: "monitoring", x: 70, y: 70 },
    ],
    edges: [
      { from: "git", to: "jenkins", label: "Webhook" },
      { from: "jenkins", to: "docker", label: "Build" },
      { from: "docker", to: "ecr", label: "Push" },
      { from: "jenkins", to: "terraform", label: "Plan/Apply" },
      { from: "terraform", to: "k8s", label: "Provision" },
      { from: "ecr", to: "k8s", label: "Pull" },
      { from: "git", to: "argo", label: "GitOps" },
      { from: "k8s", to: "prom", label: "Metrics" },
    ],
  },
]

// ===== CERTIFICATIONS DATA =====
export const certifications: CertificationEntry[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    code: "SAA-C03",
    issuer: "Amazon Web Services",
    issueDate: "2024",
    verifyUrl: "https://aws.amazon.com/verify",
    badgeColor: "#FF9900",
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate",
    code: "AZ-104",
    issuer: "Microsoft",
    issueDate: "2024",
    verifyUrl: "https://learn.microsoft.com/en-us/credentials/",
    badgeColor: "#0078D4",
  },
]

// ===== BLOG DATA (optional - placeholder) =====
export const blogPosts: BlogEntry[] = [
  { id: "blog-001", title: "Building Production-Grade Kubernetes Platforms on EKS", excerpt: "A deep dive into architecting, deploying, and operating enterprise Kubernetes clusters with automated scaling, security policies, and GitOps workflows.", tags: ["Kubernetes", "EKS", "Platform Engineering"], readTime: "8 min", published: false },
  { id: "blog-002", title: "Terraform Best Practices for Multi-Cloud Infrastructure", excerpt: "Lessons learned from managing 100% IaC coverage across AWS and Azure — state management, module design, drift detection, and team workflows.", tags: ["Terraform", "IaC", "Best Practices"], readTime: "10 min", published: false },
  { id: "blog-003", title: "Cloud Cost Optimization Strategies That Actually Work", excerpt: "Practical approaches to reducing cloud spend without sacrificing reliability, including right-sizing, reserved instances, and automated governance.", tags: ["Cloud Cost", "AWS", "Azure", "Optimization"], readTime: "7 min", published: false },
  { id: "blog-004", title: "Building an Observability Stack: Prometheus, Grafana & Beyond", excerpt: "How to design a comprehensive monitoring solution covering metrics, logs, traces, and alerts across 100+ servers.", tags: ["Observability", "Prometheus", "Grafana"], readTime: "9 min", published: false },
]

// ===== CONTACT INFO =====
export const contactInfo: ContactInfo[] = [
  { platform: "LinkedIn", handle: "umang-dakh", url: "https://linkedin.com/in/umang-dakh", icon: "linkedin" },
  { platform: "GitHub", handle: "Denny-UD", url: "https://github.com/Denny-UD", icon: "github" },
  { platform: "Email", handle: "umangdakh@gmail.com", url: "mailto:umangdakh@gmail.com", icon: "mail" },
]

// ===== NAVIGATION ITEMS =====
export interface NavItem {
  id: string
  label: string
  icon: string
  section: string
}

export const navItems: NavItem[] = [
  { id: "nav-home", label: "Home", icon: "monitor-dashboard", section: "dashboard" },
  { id: "nav-about", label: "About", icon: "user", section: "about" },
  { id: "nav-stack", label: "Stack", icon: "layers", section: "stack" },
  { id: "nav-experience", label: "Experience", icon: "timeline", section: "experience" },
  { id: "nav-projects", label: "Projects", icon: "code", section: "projects" },
  { id: "nav-architecture", label: "Architecture", icon: "network", section: "architecture" },
  { id: "nav-certifications", label: "Certifications", icon: "certificate", section: "certifications" },
  { id: "nav-blog", label: "Blog", icon: "book-open", section: "blog" },
  { id: "nav-resume", label: "Resume", icon: "file-text", section: "resume" },
  { id: "nav-contact", label: "Contact", icon: "send", section: "contact" },
]