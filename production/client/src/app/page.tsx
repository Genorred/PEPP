"use client";
import React, { useRef } from "react";
import { ArrowRight, Edit, MessageSquare, Users, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/shared/ui/button";
import { useIntersectionObserver } from "usehooks-ts";
import { cn } from "@/shared/lib/utils";
import "./main.css";
import Link from "next/link";

console.log("envUrl", process.env.googleAuthUrl);
console.log("envUrl", process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL);

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onTryToPlay = () => {
    setTimeout(async () => {
      try {
        await videoRef?.current?.play();
      } catch (error) {
        onTryToPlay();
      }
    }, 100);
  };
  const [ref, isIntercepting] = useIntersectionObserver({
    onChange: (isIntersecting, entry) => {
      if (isIntersecting) {
        onTryToPlay();
      } else {
        videoRef?.current?.pause();
      }
    }
  });
  console.log("envUrl", process.env.googleAuthUrl);
  console.log("envUrl", process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL);
  return (
    <div className={cn("page flex min-h-screen flex-col")}>
      {/* Hero Section */}
      <section className={cn(" section relative overflow-clip py-20 md:py-32")}>
        <div className={cn("container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8 header")}>
          <h1 className="font-extrabold tracking-tight">
            Share your <span className="text-primary">complete</span> perspective
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Express yourself fully with our wide-angle editor. Connect with friends, get personalized recommendations,
            and engage in meaningful discussions.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
        <div className="mt-8 flex justify-center px-6 sm:mt-20 lg:mt-24">
          <div className="relative max-w-3xl rounded-2xl border bg-background shadow-xl" ref={ref}>
            {/*<Image*/}
            {/*  src="/placeholder.svg?height=600&width=1200"*/}
            {/*  width={1200}*/}
            {/*  height={600}*/}
            {/*  alt="App interface preview"*/}
            {/*  className="rounded-2xl"*/}
            {/*  priority*/}
            {/*/>*/}
            <video height={1200} width={600} className="rounded-2xl" ref={videoRef} loop autoPlay muted playsInline  onEnded={onTryToPlay}>
              <source src="/assets/Landing_1.mp4" type="video/mp4" />
              App interface preview
            </video>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={cn("max-w-full overflow-clip section py-20 bg-muted/50")}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to connect
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our platform provides all the tools you need to express yourself, connect with others, and discover
              content that matters to you.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 horizontal-move-from-left">
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Edit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Wide-Angle Editor</h3>
              <p className="mt-2 text-muted-foreground">
                Create detailed posts with our expansive editor. Add images, videos, and formatted text to express
                your complete perspective.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Friend Connections</h3>
              <p className="mt-2 text-muted-foreground">
                Connect with friends and build your network. Share your thoughts with people who matter to you.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Recommendations</h3>
              <p className="mt-2 text-muted-foreground">
                Discover content tailored to your interests based on your interactions, likes, and shares.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Engaging Discussions</h3>
              <p className="mt-2 text-muted-foreground">
                Participate in meaningful conversations through comments and replies. Build communities around shared
                interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={cn("max-w-full overflow-clip section py-20")}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How PEPP Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Getting started is easy. Create an account, customize your profile, and start sharing your perspective.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3 horizontal-move-from-right">
            <div className="flex flex-col items-center text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                1
              </div>
              <h3 className="mt-6 text-xl font-bold">Create Your Account</h3>
              <p className="mt-2 text-muted-foreground">
                Sign up in seconds and set up your profile with your interests and a profile picture.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                2
              </div>
              <h3 className="mt-6 text-xl font-bold">Connect With Friends</h3>
              <p className="mt-2 text-muted-foreground">
                Find and add friends to your network. Discover people with similar interests.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                3
              </div>
              <h3 className="mt-6 text-xl font-bold">Share Your Perspective</h3>
              <p className="mt-2 text-muted-foreground">
                Create posts using our wide-angle editor and engage with content from your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={cn(" section py-20 bg-muted/50")}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Users Say</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Join thousands of satisfied users who have transformed how they connect online.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-bold">Jane Doe</h4>
                  <p className="text-sm text-muted-foreground">Content Creator</p>
                </div>
              </div>
              <p className="italic">
                "The wide-angle editor has completely changed how I share my content. I can now express my ideas fully
                without feeling constrained."
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-bold">John Smith</h4>
                  <p className="text-sm text-muted-foreground">Photographer</p>
                </div>
              </div>
              <p className="italic">
                "The recommendation system is spot on! I've discovered so many like-minded creators that I would have
                never found otherwise."
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">AL</span>
                </div>
                <div>
                  <h4 className="font-bold">Alex Lee</h4>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
              </div>
              <p className="italic">
                "I love how easy it is to engage in meaningful discussions. The comment and reply system makes
                conversations flow naturally."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={cn(" section py-20 bg-primary text-primary-foreground")}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to share your perspective?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl opacity-90">
            Join our community today and start connecting with people who share your interests.
          </p>
          <div className="mt-10">
            <Link href="/sign-up" className={cn(buttonVariants({
              variant: "secondary",
              size: "lg"
            }), "gap-2")}>
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}