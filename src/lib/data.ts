import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarId: string;
  bio: string;
}

export interface Article {
  id:string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageId: string;
  authorId: string;
  createdAt: string;
  tags: string[];
}

const users: User[] = [
  {
    id: 'user-1',
    name: 'Elena Vance',
    email: 'elena@example.com',
    password: 'password123',
    avatarId: 'user-1',
    bio: 'Elena is a philosopher and author, exploring the intersections of technology, mindfulness, and modern society. Her work aims to find balance in a fast-paced world.'
  },
  {
    id: 'user-2',
    name: 'Samuel Reed',
    email: 'samuel@example.com',
    password: 'password123',
    avatarId: 'user-2',
    bio: 'Samuel is an urban planner and environmental scientist dedicated to creating sustainable cities. He writes about green technology, architecture, and policy.'
  },
  {
    id: 'user-3',
    name: 'Anya Petrova',
    email: 'anya@example.com',
    password: 'password123',
    avatarId: 'user-3',
    bio: 'Anya is a marine biologist and storyteller. She combines scientific research with compelling narratives to bring the hidden world of our oceans to light.'
  },
];

let articles: Article[] = [
  {
    id: 'article-1',
    slug: 'the-art-of-mindful-living',
    title: 'The Art of Mindful Living',
    summary: 'In an age of constant distraction, mindfulness is not just a practice but an art form. This article explores practical steps to cultivate presence and peace in daily life.',
    content: `In an age of constant distraction, mindfulness is not just a practice but an art form. This article explores practical steps to cultivate presence and peace in daily life.

The constant barrage of notifications, the pressure to be always-on, and the endless scroll of social media have left many of us feeling fragmented and disconnected. Mindfulness offers a powerful antidote. It’s the basic human ability to be fully present, aware of where we are and what we’re doing, and not overly reactive or overwhelmed by what’s going on around us.

Getting started with mindfulness doesn’t require hours of meditation. It can begin with something as simple as focusing on your breath for one minute. Notice the sensation of the air entering and leaving your body. When your mind wanders, as it inevitably will, gently guide it back to your breath. This is the fundamental exercise of mindfulness.

Another powerful practice is the "body scan." This involves paying attention to different parts of your body in sequence, from your toes to your head. The goal isn’t to change any sensations you discover, but simply to notice them without judgment. It’s a way of reconnecting with your physical self and grounding yourself in the present moment.

Mindful living can extend to all activities. When you eat, savor each bite, noticing the flavors, textures, and smells. When you walk, feel the ground beneath your feet and observe the world around you. By bringing this quality of attention to everyday experiences, you transform mundane routines into opportunities for presence and appreciation. The art of mindful living is about painting your life with the vibrant colors of the present moment.`,
    imageId: 'article-1',
    authorId: 'user-1',
    createdAt: '2024-05-10',
    tags: ['Mindfulness', 'Wellness', 'Philosophy']
  },
  {
    id: 'article-2',
    slug: 'sustainable-energy-for-cities',
    title: 'Sustainable Energy Solutions for Urban Development',
    summary: 'As cities grow, so does their energy demand. We delve into innovative sustainable energy solutions, from solar-paneled skyscrapers to geothermal grids, that are powering the cities of tomorrow.',
    content: `As urban populations continue to swell, the challenge of powering our cities sustainably becomes ever more critical. Traditional energy sources are not only finite but also major contributors to climate change. The future of urban development hinges on our ability to integrate innovative, renewable energy solutions into the very fabric of our cities.

One of the most promising technologies is building-integrated photovoltaics (BIPV). This involves replacing traditional building materials with solar panels. Imagine skyscrapers whose glass facades are not just transparent but are also generating electricity from sunlight. This turns buildings from energy consumers into energy producers.

Geothermal energy offers another robust solution. By tapping into the Earth's natural heat, urban areas can create district heating and cooling systems. These networks pipe hot or cool water to multiple buildings from a central source, drastically reducing the need for individual, energy-intensive HVAC systems.

Smart grids are the brains that make these systems work together. Using AI and real-time data, a smart grid can manage energy flow from various sources—solar, wind, geothermal—and distribute it efficiently based on demand. It can direct surplus energy from a solar-powered office building in the afternoon to residential areas in the evening, minimizing waste and ensuring a reliable supply.

The transition to sustainable urban energy is a complex undertaking, requiring collaboration between engineers, architects, policymakers, and citizens. But with these and other emerging technologies, the vision of a clean, resilient, and self-sufficient city is no longer a distant dream but an achievable reality.`,
    imageId: 'article-2',
    authorId: 'user-2',
    createdAt: '2024-05-15',
    tags: ['Sustainability', 'Urbanism', 'Technology']
  },
  {
    id: 'article-3',
    slug: 'the-science-of-cooking',
    title: 'The Science of Cooking',
    summary: 'Ever wondered why bread rises or why searing meat makes it so flavorful? We break down the delicious chemistry and physics happening in your kitchen every day.',
    content: `Cooking is often seen as an art, but at its core, it is a science. Every time you step into the kitchen, you become a chemist. Understanding the fundamental scientific principles behind cooking can transform your results from mediocre to magnificent.

Let's start with the Maillard reaction, the holy grail of flavor. This is a chemical reaction between amino acids and reducing sugars that gives browned food its distinctive taste. When you sear a steak, toast bread, or roast coffee beans, you are witnessing the Maillard reaction at work. The high heat causes hundreds of different flavor compounds to be created, resulting in a complexity that can't be achieved otherwise.

Then there's gluten development. When you knead bread dough, you are stretching and aligning proteins called glutenin and gliadin. These proteins form a network that traps the carbon dioxide produced by yeast, causing the bread to rise and giving it its characteristic chewy texture. The amount of kneading directly impacts the final structure of your loaf.

Emulsification is another key concept. This is the process of mixing two liquids that don't normally combine, like oil and water. By adding an emulsifier (like the lecithin in egg yolks) and whisking vigorously, you can create stable mixtures like mayonnaise or vinaigrette. The emulsifier surrounds the oil droplets, allowing them to remain suspended in the water.

From the precise temperature control of sous-vide to the microbial magic of fermentation, science is everywhere in the kitchen. By embracing your inner scientist, you can gain greater control over your cooking and unlock a new world of culinary possibilities.`,
    imageId: 'article-3',
    authorId: 'user-1',
    createdAt: '2024-05-20',
    tags: ['Food', 'Science', 'Lifestyle']
  },
  {
    id: 'article-4',
    slug: 'wonders-of-the-deep-sea',
    title: 'Exploring the Wonders of the Deep Sea',
    summary: 'Journey with us to the abyssal plains, where sunlight never reaches and life thrives in the most extreme conditions. Discover the bizarre and beautiful creatures of the deep.',
    content: `The deep sea is the largest habitat on Earth, yet it remains one of the least explored. It is a world of crushing pressure, freezing temperatures, and perpetual darkness. But far from being a barren wasteland, it is teeming with life—bizarre, beautiful, and utterly alien.

Hydrothermal vents, often called "black smokers," are oases of life in the deep. These underwater geysers spew superheated, mineral-rich water from beneath the Earth's crust. Instead of photosynthesis, the ecosystem here is based on chemosynthesis. Specialized bacteria convert chemicals like hydrogen sulfide into energy, forming the base of a food chain that includes giant tube worms, ghostly white crabs, and swarms of shrimp.

Bioluminescence is the language of the deep. In the absence of sunlight, many creatures produce their own light for communication, camouflage, predation, and defense. The anglerfish dangles a luminous lure to attract unsuspecting prey. The vampire squid can release a cloud of glowing mucus to startle predators. It's a silent, spectacular light show happening miles below the surface.

The sheer pressure of the deep has led to incredible adaptations. The Mariana snailfish, living at depths of nearly 8,000 meters, has a flexible skull and a gelatinous body to withstand pressures that would crush a submarine.

Exploring the deep sea is a journey to another world, one that constantly challenges our understanding of life itself. Each new dive with a remotely operated vehicle (ROV) reveals new species and new mysteries, reminding us how much we still have to learn about our own planet.`,
    imageId: 'article-4',
    authorId: 'user-3',
    createdAt: '2024-05-25',
    tags: ['Science', 'Nature', 'Exploration']
  },
  {
    id: 'article-5',
    slug: 'ai-in-healthcare',
    title: 'The Future of AI in Healthcare',
    summary: 'Artificial intelligence is poised to revolutionize healthcare, from diagnosing diseases earlier and more accurately to personalizing treatment plans. We look at the cutting-edge of medical AI.',
    content: `Artificial intelligence (AI) is no longer a futuristic concept in medicine; it's a present-day reality that is beginning to reshape every aspect of healthcare. Its potential to improve patient outcomes, streamline processes, and accelerate research is immense.

One of the most significant impacts of AI is in medical imaging analysis. AI algorithms, particularly deep learning models, can be trained to detect patterns in X-rays, CT scans, and MRIs that may be invisible to the human eye. Studies have shown that AI can identify certain types of cancer and diabetic retinopathy with accuracy rivaling or even exceeding that of expert radiologists. This can lead to earlier diagnoses and more effective treatments.

AI is also driving the push towards personalized medicine. By analyzing a patient's genetic information, lifestyle, and clinical data, AI models can help predict their risk for certain diseases and recommend personalized prevention strategies. For patients who are already sick, AI can help tailor treatment plans, suggesting the most effective drugs and dosages based on their unique biological makeup.

In drug discovery, AI is dramatically accelerating the process of finding new medicines. It can analyze vast databases of molecular compounds to identify potential drug candidates in a fraction of the time it would take with traditional methods. This could lead to faster development of treatments for a wide range of diseases.

Of course, the integration of AI into healthcare comes with challenges, including data privacy, algorithmic bias, and the need for regulatory oversight. However, as these technologies mature and are implemented responsibly, AI promises a future where healthcare is more predictive, preventive, personalized, and participatory for everyone.`,
    imageId: 'article-5',
    authorId: 'user-2',
    createdAt: '2024-06-01',
    tags: ['AI', 'Technology', 'Healthcare']
  },
  {
    id: 'article-6',
    slug: 'post-modern-architecture',
    title: 'Post-Modern Architecture: A Rebellion in Color',
    summary: 'Breaking free from the rigid minimalism of modernism, post-modern architecture embraced whimsy, color, and historical reference. Explore the playful and provocative world of post-modernism.',
    content: `Post-modern architecture emerged in the late 1970s as a direct reaction against the perceived austerity and rigidity of the modernist movement. Where modernism preached "form follows function" and "less is more," post-modernism cheekily replied with "less is a bore." It was a rebellion marked by color, ornament, and a playful collage of historical styles.

Key figures like Robert Venturi, Philip Johnson, and Michael Graves championed this new approach. Venturi's Vanna Venturi House is often cited as one of the first post-modern buildings, with its non-functional arch and split-gable roof that defied modernist conventions.

One of the defining features of post-modernism is its use of irony and wit. Buildings often incorporate classical elements like columns and pediments but in an exaggerated, out-of-context, or brightly colored way. Philip Johnson's AT&T Building in New York, with its "Chippendale" top, is a prime example of this historical quotation.

Color was a powerful tool for post-modern architects. They used bold, often clashing, color palettes to break up building facades and create visual interest. This was a stark contrast to the monochrome whites, grays, and blacks favored by modernists.

While sometimes criticized for being superficial or kitschy, post-modern architecture succeeded in reintroducing humanism, humor, and historical memory into a field that had become overly dogmatic. It reopened the conversation about what a building could be and paved the way for the diverse architectural styles we see today.`,
    imageId: 'article-6',
    authorId: 'user-2',
    createdAt: '2024-06-05',
    tags: ['Architecture', 'Art', 'History']
  },
];

export const getArticles = (): Article[] => articles;

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getAuthor = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getArticlesByAuthor = (authorId: string): Article[] => {
  return articles.filter(article => article.authorId === authorId);
};

export const getImage = (id: string): ImagePlaceholder | undefined => {
    return PlaceHolderImages.find(img => img.id === id);
}

export const findUser = (email: string, password?: string): User | undefined => {
    const user = users.find(u => u.email === email);
    if (!user) return undefined;
    if (password && user.password !== password) return undefined;
    return user;
}

export const addUser = (user: Omit<User, 'id'>): User => {
    const newUser = { ...user, id: `user-${users.length + 1}`};
    users.push(newUser);
    return newUser;
}

export const addArticle = (article: Omit<Article, 'id' | 'slug' | 'createdAt'>): Article => {
    const newArticle = { 
        ...article, 
        id: `article-${articles.length + 1}`,
        slug: article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        createdAt: new Date().toISOString().split('T')[0],
    };
    articles.unshift(newArticle);
    return newArticle;
}
