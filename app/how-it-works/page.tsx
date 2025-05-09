import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Camera, CreditCard, Truck, Clock, CheckCircle } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">How Book My DSLR Works</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Renting a camera with us is quick, easy, and hassle-free. Follow these simple steps to get started.
          </p>
          <Button asChild className="bg-yellow-500 text-black hover:bg-yellow-600">
            <Link href="/cameras">Browse Cameras</Link>
          </Button>
        </div>
      </section>

      {/* Process Steps */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">1. Browse & Select</h2>
            <p className="text-muted-foreground mb-6">
              Browse our extensive collection of cameras, lenses, and accessories. Use filters to narrow down your
              search based on brand, type, price, and availability.
            </p>
            <ul className="space-y-3">
              {browseFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Browse cameras" fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16 md:mt-24">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden order-1 md:order-none">
            <Image src="/placeholder.svg?height=400&width=600" alt="Book and pay" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">2. Book & Pay</h2>
            <p className="text-muted-foreground mb-6">
              Once you've found the perfect camera, select your rental dates and add it to your cart. Complete the
              checkout process with our secure payment system.
            </p>
            <ul className="space-y-3">
              {bookFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16 md:mt-24">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">3. Receive Equipment</h2>
            <p className="text-muted-foreground mb-6">
              Choose between convenient delivery to your doorstep or pickup from our store. All equipment is thoroughly
              checked and cleaned before handover.
            </p>
            <ul className="space-y-3">
              {receiveFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Receive equipment" fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16 md:mt-24">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden order-1 md:order-none">
            <Image src="/placeholder.svg?height=400&width=600" alt="Return equipment" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">4. Return</h2>
            <p className="text-muted-foreground mb-6">
              When your rental period is over, return the equipment using our hassle-free return process. Drop it off at
              our store or schedule a pickup.
            </p>
            <ul className="space-y-3">
              {returnFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process Icons */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Rental Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes renting camera equipment simple and convenient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <Card key={step.id} className="border-none shadow-none bg-transparent">
                <CardContent className="flex flex-col items-center text-center pt-6">
                  <div className="bg-yellow-500 text-black rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our rental process
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Rent Your Camera?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Browse our collection and find the perfect camera for your next photography adventure
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Link href="/cameras">Browse Cameras</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const browseFeatures = [
  "Detailed specifications and high-quality images",
  "Real customer reviews and ratings",
  "Availability calendar showing rental status",
  "Compare different models side by side",
]

const bookFeatures = [
  "Flexible rental periods from 1 day to several weeks",
  "Secure payment processing with multiple options",
  "Optional insurance coverage for peace of mind",
  "Easy rescheduling if your plans change",
]

const receiveFeatures = [
  "Same-day delivery available for urgent needs",
  "Scheduled delivery at your preferred time",
  "In-store pickup with equipment testing and tutorial",
  "All accessories and manuals included",
]

const returnFeatures = [
  "Convenient drop-off at our store location",
  "Scheduled pickup from your location",
  "Flexible return hours to fit your schedule",
  "Quick inspection process with immediate confirmation",
]

const steps = [
  {
    id: 1,
    title: "Browse & Select",
    description: "Browse our collection and select the camera that fits your needs",
    icon: <Camera className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Book & Pay",
    description: "Choose your rental dates and complete the payment securely",
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Receive Equipment",
    description: "Get your camera delivered to your doorstep or pick it up",
    icon: <Truck className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Return",
    description: "Return the equipment when your rental period is over",
    icon: <Clock className="h-6 w-6" />,
  },
]

const faqs = [
  {
    question: "What identification do I need to rent a camera?",
    answer:
      "You'll need a valid government-issued photo ID (such as a driver's license or passport) and a credit card in your name. For first-time renters, we may also require proof of address.",
  },
  {
    question: "What happens if I damage the equipment?",
    answer:
      "We offer optional damage protection plans that cover accidental damage. If you decline this coverage, you'll be responsible for repair or replacement costs. Normal wear and tear is always covered.",
  },
  {
    question: "Can I extend my rental period?",
    answer:
      "Yes, you can extend your rental period if the equipment isn't already reserved. Contact us at least 24 hours before your return date to check availability and arrange an extension.",
  },
  {
    question: "Do you provide delivery services?",
    answer:
      "Yes, we offer both delivery and pickup services. Delivery fees vary based on your location. Same-day delivery is available for orders placed before noon, subject to availability.",
  },
  {
    question: "What if the equipment is faulty?",
    answer:
      "All our equipment is thoroughly tested before rental. If you experience any issues, contact us immediately and we'll arrange a replacement or refund. We have a 24/7 technical support line for urgent matters.",
  },
  {
    question: "Can I cancel my reservation?",
    answer:
      "Reservations can be canceled up to 48 hours before the rental start date for a full refund. Cancellations within 48 hours may be subject to a cancellation fee of 50% of the rental cost.",
  },
]
