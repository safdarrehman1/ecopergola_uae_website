export interface NewsItem {
  id: string;
  date: string;
  monthYear: string;
  title: string;
  summary: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
  image?: string;
}

export const newsData: NewsItem[] = [
  {
    id: "award-winning-facade-project",
    date: "Nov 2025",
    monthYear: "November 2025",
    title: "Award-Winning Facade Project",
    summary:
      'Eco Pergola wins "Best Facade Installation" for prestigious Dubai Marina residential tower featuring cutting-edge glass technology.',
    ctaText: "Read More",
    ctaLink: "/projects/dubai-marina-luxury-tower",
    badge: "Industry Award",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "new-sustainable-product-line",
    date: "Oct 2025",
    monthYear: "October 2025",
    title: "New Sustainable Product Line",
    summary:
      "Introducing our LEED-certified bio-climatic pergola systems with 40% energy savings and superior thermal performance for UAE climate.",
    ctaText: "Learn More",
    ctaLink: "/pergola-types/louvered-pergola",
    badge: "Sustainability",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "strategic-partnership-announcement",
    date: "Sep 2025",
    monthYear: "September 2025",
    title: "Strategic Partnership Announcement",
    summary:
      "Partnering with leading European manufacturers to bring next-generation minimal sliding systems to Dubai's luxury market.",
    ctaText: "View Details",
    ctaLink: "/services/minimal-sliding-doors",
    badge: "Partnership",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "expanded-production-facility",
    date: "Aug 2025",
    monthYear: "August 2025",
    title: "Expanded Production Facility",
    summary:
      "Opening new 50,000 sq ft manufacturing facility in Dubai Industrial City with advanced CNC machinery and increased capacity.",
    ctaText: "Discover More",
    ctaLink: "/about",
    badge: "Expansion",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "free-consultation-services",
    date: "Jul 2025",
    monthYear: "July 2025",
    title: "Free Consultation Services",
    summary:
      "Now offering complimentary on-site consultations and 3D visualization for all residential and commercial facade projects in UAE.",
    ctaText: "Book Now",
    ctaLink: "/contact",
    badge: "Complimentary Service",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop",
  },
];
