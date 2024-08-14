/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;


// rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
// -e "ssh -i /mnt/c/Users/ивв/.ssh/pepp-ssh-keys.pem" \
// . ubuntu@ec2-13-60-36-131.eu-north-1.compute.amazonaws.com:~/app