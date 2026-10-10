export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  initials: string;
  verified: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "mohammed-al-rashid",
    quote:
      "Eco Pergola transformed our villa with their stunning minimal sliding doors. The quality is exceptional and the installation team was professional. Highly recommend for luxury projects in Dubai!",
    name: "Mohammed Al Rashid",
    role: "Villa Owner",
    location: "Palm Jumeirah",
    rating: 5,
    initials: "MR",
    verified: true,
  },
  {
    id: "sarah-johnson",
    quote:
      "Outstanding craftsmanship! The facade system they installed exceeded our expectations. On-time delivery, competitive pricing, and excellent after-sales support. Best aluminum contractor in UAE.",
    name: "Sarah Johnson",
    role: "Property Developer",
    location: "Dubai Marina",
    rating: 5,
    initials: "SJ",
    verified: true,
  },
  {
    id: "ahmed-hassan",
    quote:
      "We chose Eco Pergola for our hotel's glass roof system. Their innovative solutions and attention to detail are unmatched. The project was completed within budget and timeline. Excellent partner!",
    name: "Ahmed Hassan",
    role: "Hotel Manager",
    location: "Downtown Dubai",
    rating: 5,
    initials: "AH",
    verified: true,
  },
];
