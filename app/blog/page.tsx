import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, Search, User } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Photography Blog</h1>
            <p className="text-muted-foreground">Tips, tutorials, and inspiration for photographers of all levels</p>
          </div>

          {/* Featured Post */}
          <div className="mb-12">
            <Link href="/blog/understanding-camera-lenses">
              <div className="group relative">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Understanding Camera Lenses"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">Tutorial</Badge>
                  <h2 className="text-2xl font-bold mt-2 group-hover:text-yellow-500 transition-colors">
                    Understanding Camera Lenses: A Comprehensive Guide
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Learn about different types of camera lenses, their uses, and how to choose the right one for your
                    photography style.
                  </p>
                  <div className="flex items-center mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>By Sarah Johnson</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>May 15, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">{post.category}</Badge>
                    <h3 className="font-semibold text-lg mt-2 group-hover:text-yellow-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>By {post.author}</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="sm" className="bg-yellow-500 text-black border-yellow-500">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search articles..." className="pl-8" />
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className="flex items-center justify-between group"
                >
                  <span className="group-hover:text-yellow-500 transition-colors">{category.name}</span>
                  <Badge variant="outline">{category.count}</Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Posts */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Posts</h3>
            <div className="space-y-4">
              {popularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 group">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-yellow-500 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest photography tips and tutorials delivered to your inbox.
            </p>
            <div className="space-y-2">
              <Input placeholder="Your email address" />
              <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Camera Accessories for Beginners",
    slug: "essential-camera-accessories",
    excerpt:
      "Discover the must-have accessories that will help you get the most out of your new camera and improve your photography skills.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Gear",
    author: "Michael Chen",
    date: "April 28, 2023",
  },
  {
    id: 2,
    title: "Mastering Long Exposure Photography",
    slug: "mastering-long-exposure",
    excerpt:
      "Learn the techniques and settings needed to capture stunning long exposure photographs in various lighting conditions.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Technique",
    author: "Emily Rodriguez",
    date: "April 15, 2023",
  },
  {
    id: 3,
    title: "The Art of Portrait Photography",
    slug: "art-of-portrait-photography",
    excerpt:
      "Explore the essential elements of capturing compelling portraits, from lighting and composition to posing and connecting with your subject.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Tutorial",
    author: "David Wilson",
    date: "March 30, 2023",
  },
  {
    id: 4,
    title: "Choosing the Right Camera for Wildlife Photography",
    slug: "camera-for-wildlife-photography",
    excerpt:
      "Find out which camera features and specifications are most important when photographing wildlife in their natural habitats.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Gear",
    author: "Sarah Johnson",
    date: "March 22, 2023",
  },
]

const categories = [
  { id: 1, name: "Tutorials", slug: "tutorials", count: 24 },
  { id: 2, name: "Gear Reviews", slug: "gear-reviews", count: 18 },
  { id: 3, name: "Techniques", slug: "techniques", count: 15 },
  { id: 4, name: "Inspiration", slug: "inspiration", count: 12 },
  { id: 5, name: "Post-Processing", slug: "post-processing", count: 9 },
  { id: 6, name: "Business Tips", slug: "business-tips", count: 7 },
]

const popularPosts = [
  {
    id: 1,
    title: "Understanding the Exposure Triangle: Aperture, Shutter Speed, and ISO",
    slug: "understanding-exposure-triangle",
    image: "/placeholder.svg?height=100&width=100",
    date: "May 5, 2023",
  },
  {
    id: 2,
    title: "5 Common Photography Mistakes and How to Avoid Them",
    slug: "common-photography-mistakes",
    image: "/placeholder.svg?height=100&width=100",
    date: "April 20, 2023",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Landscape Photography",
    slug: "ultimate-guide-landscape-photography",
    image: "/placeholder.svg?height=100&width=100",
    date: "April 8, 2023",
  },
]
