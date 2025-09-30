import { ActivityRecommendation } from '../types';

// Dummy data for Milestone 1 - represents what we'll get from Claude API in Milestone 2
export const dummyActivities: ActivityRecommendation[] = [
  {
    title: "**Children's Museum of Science & Discovery**",
    emoji: "🔬",
    description: "This interactive museum offers hands-on exhibits perfect for curious minds aged 5-12. Your kids will love the dinosaur dig site, space exploration room, and the water play area. The museum features special weekend workshops and is designed to make learning fun through play. Plan for 2-3 hours to explore all the exhibits, and don't miss the planetarium show!",
    url: "https://example.com/childrens-museum",
    distance: "2.3 miles",
    ageRange: "Ages 3-12",
    timeInfo: "Open Saturday 9am-5pm"
  },
  {
    title: "**Riverside Park Adventure Playground**",
    emoji: "🌳",
    description: "A sprawling 15-acre park with multiple playgrounds, walking trails, and picnic areas. The adventure playground features climbing structures, slides, and a splash pad that's perfect for hot summer days. The park also has a nature center with educational programs about local wildlife. Great for families who want to spend the whole day outdoors with plenty of space for kids to run around.",
    url: "https://example.com/riverside-park",
    distance: "4.7 miles",
    ageRange: "All ages",
    timeInfo: "Open daily 6am-9pm"
  },
  {
    title: "**Family Fun Center & Arcade**",
    emoji: "🎮",
    description: "An indoor entertainment center featuring classic arcade games, laser tag, and a soft play area for younger children. The center offers birthday party packages and has a snack bar with family-friendly options. Perfect for rainy days or when you want to escape the heat. The arcade has games suitable for all ages, from simple coin pushers to more complex skill games.",
    url: "https://example.com/family-fun-center",
    distance: "6.1 miles",
    ageRange: "Ages 2-16",
    timeInfo: "Open Saturday 10am-10pm"
  },
  {
    title: "**Farmers Market & Petting Zoo**",
    emoji: "🐐",
    description: "A charming local farmers market with a small petting zoo featuring goats, rabbits, and chickens. Kids can feed the animals and learn about farm life while parents shop for fresh produce. The market also has food trucks, live music on weekends, and craft vendors. It's a great way to teach children about where their food comes from while having fun.",
    url: "https://example.com/farmers-market",
    distance: "3.8 miles",
    ageRange: "Ages 2-10",
    timeInfo: "Saturdays 8am-2pm"
  },
  {
    title: "**Community Pool & Splash Pad**",
    emoji: "🏊‍♀️",
    description: "A public swimming facility with both a main pool and a separate splash pad area for younger children. The pool offers swimming lessons and has a shallow end perfect for kids learning to swim. The splash pad features water fountains, sprayers, and interactive water toys. Lifeguards are on duty, and the facility has changing rooms and snack machines.",
    url: "https://example.com/community-pool",
    distance: "5.2 miles",
    ageRange: "All ages",
    timeInfo: "Open Saturday 10am-8pm"
  }
];

// Helper function to simulate API delay (for testing loading states)
export const simulateApiCall = (delay: number = 1500): Promise<ActivityRecommendation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyActivities);
    }, delay);
  });
};
