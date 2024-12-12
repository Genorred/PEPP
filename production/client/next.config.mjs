/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ]
  },
  webpack: {
    watchOptions: {
      poll: 800,
      aggregateTimeout: 300
    }
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*" // Прокси на внешний API
      },
      {
        source: "/auth/google",
        destination: "http://localhost:5591/auth/google" // users microservice
      }
    ];
  }
};

export default nextConfig;


// rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env.local.local.development.development' \
// -e "ssh -i /mnt/c/Users/ивв/.ssh/pepp-ssh-keys.pem" \
// . ubuntu@ec2-13-60-36-131.eu-north-1.compute.amazonaws.com:~/app