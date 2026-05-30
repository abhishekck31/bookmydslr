"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, HelpCircle, Cog } from "lucide-react"
import Link from "next/link"

export default function DataManagementGuidePage() {
  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">Book My DSLR - Data Management Guide</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This guide explains how to update your camera inventory, accessories, and pricing information. Follow these
          steps to keep your website content fresh and up-to-date.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="cameras" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Camera Data
          </TabsTrigger>
          <TabsTrigger value="accessories" className="flex items-center">
            <Cog className="mr-2 h-4 w-4" />
            Accessories
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Data Management Overview</CardTitle>
              <CardDescription>Learn how to update your website content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Book My DSLR website uses data files to store information about cameras, accessories, and other
                rental items. These files are located in the <code>/data</code> directory of your project.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-amber-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cameras</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Update camera inventory, specs, and pricing in the cameras.ts file.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#" onClick={() => document.querySelector('[value="cameras"]')?.click()}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-amber-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Accessories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Manage accessories like tripods, flashes, and other gear in accessories.ts.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#" onClick={() => document.querySelector('[value="accessories"]')?.click()}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-amber-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Lenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Update lens inventory in the lenses.ts data file.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#" onClick={() => document.querySelector('[value="help"]')?.click()}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cameras">
          <Card>
            <CardHeader>
              <CardTitle>Camera Data Management</CardTitle>
              <CardDescription>How to update camera information and add new cameras</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">Updating Camera Data</h3>
              <p>
                All camera data is stored in <code>/data/cameras.ts</code>. This file contains an array of camera
                objects with details like price, specifications, and availability.
              </p>

              <div className="bg-gray-50 p-4 rounded-md overflow-auto my-4">
                <pre className="text-sm">
                  {`// Example camera object structure
{
  id: 21, // Make sure this is unique
  name: "New Camera Model",
  description: "Short description",
  fullDescription: "Detailed description...",
  price: 1500, // Daily rental price in ₹
  rating: 4.5,
  reviews: 25,
  available: true,
  isNew: true,
  featured: false,
  brand: "Canon", // Brand name
  type: "DSLR", // Camera type (DSLR, Mirrorless, etc.)
  image: "/placeholder.svg?height=600&width=600", // Main image URL
  gallery: [ // Additional images
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600"
  ],
  specs: {
    sensor: "Full-frame",
    resolution: "45MP",
    batteryLife: "800 shots"
  },
  technicalDetails: {
    "Sensor Type": "Full-frame CMOS",
    // Other technical specifications...
  },
  features: [
    "Feature 1",
    "Feature 2",
    // More features...
  ]
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6">Adding a New Camera</h3>
              <p>To add a new camera:</p>
              <ol className="list-decimal ml-5 space-y-2">
                <li>
                  Open the <code>/data/cameras.ts</code> file
                </li>
                <li>Copy an existing camera object as a template</li>
                <li>Paste it at the end of the cameras array</li>
                <li>Update all the details for your new camera</li>
                <li>
                  Assign a <strong>unique ID</strong> that's not already used
                </li>
                <li>Save the file</li>
              </ol>

              <h3 className="text-xl font-semibold mt-6">Updating Prices</h3>
              <p>
                To update the rental price for a camera, simply change the <code>price</code> property value. This price
                represents the daily rental rate in Rupees (₹).
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessories">
          <Card>
            <CardHeader>
              <CardTitle>Accessories Data Management</CardTitle>
              <CardDescription>How to update and add accessories inventory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">Accessories Data File</h3>
              <p>
                All accessories are stored in <code>/data/accessories.ts</code>. Similar to cameras, this file contains
                an array of accessory objects.
              </p>

              <div className="bg-gray-50 p-4 rounded-md overflow-auto my-4">
                <pre className="text-sm">
                  {`// Example accessory object structure
{
  id: "acc-011", // Unique ID with acc- prefix
  name: "New Accessory Name",
  brand: "Brand Name",
  description: "Detailed description of the accessory",
  price: 100, // Daily rental price in ₹
  rating: 4.7,
  reviews: 45,
  image: "/placeholder.svg?height=300&width=300", // Image URL
  available: true,
  featured: false,
  isNew: true,
  type: "Tripod" // Category type
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6">Adding New Accessories</h3>
              <p>Follow these steps to add a new accessory:</p>
              <ol className="list-decimal ml-5 space-y-2">
                <li>
                  Open the <code>/data/accessories.ts</code> file
                </li>
                <li>Copy an existing accessory object as a template</li>
                <li>Paste it at the end of the accessories array</li>
                <li>Update all the details for your new accessory</li>
                <li>
                  Assign a <strong>unique ID</strong> with the "acc-" prefix
                </li>
                <li>Save the file</li>
              </ol>

              <div className="bg-amber-50 p-4 rounded-md mt-6">
                <p className="font-semibold">Important Note:</p>
                <p>
                  The <code>type</code> field is used for filtering and categorization. Use consistent category names
                  across similar accessories to ensure proper filtering on the website.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Additional Help & Resources</CardTitle>
              <CardDescription>Troubleshooting and advanced customizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">Image Management</h3>
              <p>
                For optimal performance, place your product images in the <code>/public/images</code> directory and
                reference them as <code>/images/your-image.jpg</code>.
              </p>

              <p>For proper display, use the following image dimensions:</p>
              <ul className="list-disc ml-5 space-y-2">
                <li>Camera main images: 600×600 pixels</li>
                <li>Gallery images: 600×600 pixels</li>
                <li>Accessory images: 300×300 pixels</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">Lenses Management</h3>
              <p>
                Lens data is stored in <code>/data/lenses.ts</code> and follows a similar structure to accessories. Each
                lens object should have unique properties relevant to lenses such as focal length and aperture.
              </p>

              <h3 className="text-xl font-semibold mt-6">Contact Information</h3>
              <p>
                If you need further assistance with updating your website content, please contact our support team at{" "}
                <a href="mailto:support@bookmydslr.com" className="text-amber-600 hover:underline">
                  support@bookmydslr.com
                </a>
                .
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Technical Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Need help with coding issues or advanced customizations? Our technical team is available during
                      business hours.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black hover:from-amber-600 hover:to-yellow-400">
                      Contact Tech Support
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">User Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Download our comprehensive user guide for detailed instructions on managing your rental website.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Download PDF Guide</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
