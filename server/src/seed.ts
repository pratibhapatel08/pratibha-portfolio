import { Education, Experience, Profile, Project, Skill } from "./models.js";

const profile = {
  name: "Pratibha Patel",
  title: "MERN Full Stack Developer",
  headline: "Agentic AI, Generative AI, and DevOps",
  lede: "I design and ship scalable web products with React, Node.js, AWS, and AI — from secure authentication and payments to Docker and CI/CD.",
  email: "pratibhapatel654321@gmail.com",
  phone: "6260001094",
  yearsLabel: "3+ years",
  focus: ["MERN", "Agentic AI", "Generative AI", "DevOps"],
  summary:
    "MERN Full Stack Developer with more than 3 years of work experience, specializing in MySQL, MongoDB, Express.js, React.js, Node.js, Next.js, AWS, Git, Docker, CI/CD, payment gateways, Agentic AI, Generative AI, software engineering, and microservices. Strong expertise in authentication with JWT, third-party API integrations, and performance optimization. Passionate about writing clean, maintainable code and delivering high-quality projects.",
};

const experience = [
  {
    order: 1,
    role: "MERN Full Stack Developer (MERN + AI + DevOps)",
    company: "Micro Technologies",
    period: "Oct 2023 – Present",
    current: true,
    points: [
      "Developed and maintained scalable full-stack web applications using React.js, Node.js, MongoDB, and MySQL.",
      "Designed and implemented intuitive user interfaces using Tailwind CSS, Material UI, and Figma.",
      "Streamlined authentication workflows using JWT, ensuring secure user sessions and data protection.",
      "Built RESTful APIs and optimized API performance through effective database query handling.",
      "Automated build, testing, and deployment processes using Docker and CI/CD pipelines.",
      "Integrated third-party services such as Twilio, Razorpay, and Nodemailer to enhance application functionality.",
      "Collaborated with cross-functional teams to deliver high-quality work within tight deadlines.",
      "Supported a key company product by writing modular, reusable, and scalable code.",
      "Gained hands-on experience in cloud deployment with AWS and version control with Git.",
      "Tested and debugged APIs using Postman and Swagger.",
    ],
  },
];

const skills = [
  {
    order: 1,
    category: "Frontend",
    items: [
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind CSS",
      "Material UI",
      "Ant Design",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Redux",
      "Redux Toolkit",
      "Google Charts",
      "React Chart",
    ],
  },
  {
    order: 2,
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Microservices"],
  },
  {
    order: 3,
    category: "Database",
    items: ["MySQL", "MongoDB", "Redis"],
  },
  {
    order: 4,
    category: "Cloud & DevOps",
    items: [
      "AWS EC2",
      "AWS S3",
      "AWS RDS",
      "AWS SNS",
      "AWS Amplify",
      "Load Balancer",
      "IAM",
      "Autoscaling",
      "Docker",
      "CI/CD",
      "Git",
      "GitHub",
    ],
  },
  {
    order: 5,
    category: "AI",
    items: ["AI Integration", "Generative AI", "Agentic AI"],
  },
  {
    order: 6,
    category: "Integrations & Testing",
    items: [
      "JWT",
      "Razorpay",
      "Stripe",
      "Twilio",
      "SendGrid",
      "Nodemailer",
      "Postman",
      "Swagger",
      "Thunder Client",
      "Figma",
    ],
  },
];

const projects = [
  {
    order: 1,
    title: "TechHub",
    category: "E-Learning Platform",
    accent: "mint",
    summary:
      "A digital learning system for video courses, quizzes, and progress tracking, with separate experiences for admins, teachers, and students.",
    highlights: [
      "Role-based access for Admin, Teacher, and Student.",
      "Secure login with JWT, video uploads on AWS S3, and notifications through Nodemailer.",
      "RESTful APIs for course management and enrolled-user tracking.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MySQL", "JWT", "AWS S3", "Nodemailer"],
  },
  {
    order: 2,
    title: "eBazar",
    category: "E-Commerce Platform",
    accent: "ember",
    summary:
      "A multi-role commerce platform for admins, retailers, and customers, covering catalog, cart, payments, and orders.",
    highlights: [
      "Product listing, cart, payment gateway, and order management.",
      "Interfaces for Admin, Retailer, and Customer roles.",
      "Dockerized and deployed on AWS EC2 with CI/CD.",
    ],
    stack: ["React", "Tailwind CSS", "Material UI", "Node.js", "Express.js", "MongoDB", "Docker", "AWS EC2", "CI/CD"],
  },
  {
    order: 3,
    title: "Nestora",
    category: "Real Estate Platform",
    accent: "gold",
    summary:
      "A property listing and booking platform for agents and buyers, with search, media uploads, maps, and authenticated access.",
    highlights: [
      "Property search with filters, image uploads, map integration, and user authentication.",
      "JWT auth, AWS S3 image storage, and Docker-based deployment.",
      "Role-based access and REST APIs for property management.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MySQL", "JWT", "AWS S3", "Docker"],
  },
];

const education = [
  {
    order: 1,
    degree: "Bachelor of Science",
    field: "Mathematics, Computer Science",
    school: "Barkatullah University (BU)",
    location: "Bhopal",
    year: "2022",
  },
];

export async function seedIfEmpty() {
  const existing = await Profile.countDocuments();
  if (existing > 0) return;

  await Promise.all([
    Profile.create(profile),
    Experience.insertMany(experience),
    Skill.insertMany(skills),
    Project.insertMany(projects),
    Education.insertMany(education),
  ]);
}
