import React, { useEffect, useRef } from "react";
import { Section } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextFade } from "@/components/ui/TextFade";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "../../../../public/images/home_image.png";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";

export default function HeroSection() {
  return (
    <>
      <section className="h-lvh flex justify-center items-center">
        <div className="container mr-auto text-center">
          <BackgroundBeams />
          <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000035] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

          {/* <!-- Hero Content --> */}
          <div class="relative z-10 box-border flex h-full flex-col items-center justify-center px-4">
            <div class="max-w-3xl text-center">
              <TextFade
                direction="up"
                className="pt-0 pb-5 flex-col flex justify-center items-center space-y-0"
              >
                <h1 class="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-violet-500">
                  Manage Your Finances <br /> with Intelligence
                </h1>
                <p class=" mb-8 max-w-2xl text-lg text-gray-400">
                  An AI-powered financial management platform that helps you
                  track, analyze, and optimize your spending with real-time
                  insights.
                </p>
                <div className="flex justify-center space-x-4 gap-10">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="https://www.youtube.com/roadsidecoder">
                    <Button size="lg" variant="outline" className="px-8 bg-blue-100">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              </TextFade>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
