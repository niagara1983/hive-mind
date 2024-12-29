import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowRight, Users, Brain, Heart } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              A healthy hive is a{" "}
              <span className="text-primary">united hive</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join supportive communities to improve your mental and emotional well-being through shared daily rituals and peer support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">
                  Join Your Hive <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How HiveMind Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg">
                <Users className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Join a Hive</h3>
                <p className="text-muted-foreground">
                  Connect with a small, supportive group focused on similar mental health goals.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <Brain className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Daily Rituals</h3>
                <p className="text-muted-foreground">
                  Participate in simple daily challenges that promote mental wellness.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <Heart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Grow Together</h3>
                <p className="text-muted-foreground">
                  Progress through levels with your hive, unlocking new challenges and rewards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Your Hive?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your journey to better mental health with a supportive community by your side.
            </p>
            <Button size="lg" asChild>
              <Link href="/register">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HiveMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}