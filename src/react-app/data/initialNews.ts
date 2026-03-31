export const LATEST_NEWS = [
  {
    id: '1',
    title: 'Anthropic Challenges U.S. Government Over Autonomous Weapon Designations',
    excerpt: 'A federal judge has temporarily blocked a government designation labeling Anthropic as a supply-chain risk after the AI lab refused to allow its models to be used for lethal autonomous weapons.',
    content: `
      <p>In a significant legal move, a federal judge has issued a temporary restraining order against the U.S. government's attempt to label Anthropic, a leading AI research lab, as a "supply-chain risk." The designation came after Anthropic leaders explicitly refused to modify their safety-first models for use in autonomous weapons systems.</p>
      <p>The judge noted that labeling a private company as a "risk" based solely on its refusal to participate in specific military projects could set a dangerous precedent for corporate autonomy and ethical technology development.</p>
      <p>Anthropic, founded with a focus on AI safety and alignment, argued that its dual-use technology should remain under strict civilian control. This case marks the first major legal confrontation between "Big AI" and government defense policies in 2026.</p>
    `,
    category_id: 'tech',
    category: { name: 'Technology', slug: 'tech', color: '#3b82f6' },
    author_id: '1',
    profiles: { full_name: 'Sarah Chen', avatar_url: 'https://i.pravatar.cc/150?u=sarah' },
    featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    published_at: '2026-03-31T10:00:00Z',
    views_count: 1250,
    slug: 'anthropic-challenges-us-government-ai-weapons',
    is_breaking: true,
    is_featured: true,
    is_trending: true
  },
  {
    id: '2',
    title: 'Kleiner Perkins Announces $3.5 Billion "Foundations of AI" Fund',
    excerpt: 'The legendary venture capital firm is doubling down on AI infrastructure, launching a massive new fund dedicated to the next decade of agentic AI systems.',
    content: `
      <p>Kleiner Perkins has signaled its intent to lead the AI infrastructure revolution by announcing a new $3.5 billion fund. Dubbed "Foundations of AI," the fund will target startups building the core components of the agentic economy—from specialized silicon to the software frameworks that allow AI agents to navigate web environments autonomously.</p>
      <p>"We are moving beyond chatbots," said a KP partner. "The next wave is about systems that can do work. This fund is about building the bedrock for that transition."</p>
      <p>The announcement comes as AI infrastructure investment reaches record highs globally, with specialized data center campuses requiring multi-gigawatt power sources to satisfy the growing demand for "AI factories."</p>
    `,
    category_id: 'business',
    category: { name: 'Business', slug: 'business', color: '#10b981' },
    author_id: '2',
    profiles: { full_name: 'Marcus Thorne', avatar_url: 'https://i.pravatar.cc/150?u=marcus' },
    featured_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000',
    published_at: '2026-03-30T15:30:00Z',
    views_count: 890,
    slug: 'kleiner-perkins-3-5-billion-ai-fund',
    is_breaking: false,
    is_featured: true,
    is_trending: true
  },
  {
    id: '3',
    title: 'Nvidia CEO: "AI Proficiency Is Now a Baseline Job Requirement"',
    excerpt: 'Jensen Huang warns that engineers who do not integrate AI agents into their daily workflows risk obsolescence as "agentic productivity" becomes the industry standard.',
    content: `
      <p>At the 2026 GTC Conference, Nvidia CEO Jensen Huang delivered a stern warning to the global workforce: AI is no longer an optional tool. Comparing AI proficiency to literacy, Huang stated that the divide between those who use AI agents and those who don't is widening rapidly.</p>
      <p>"We are seeing a 10x productivity delta in engineering teams that have successfully integrated AI into their CI/CD pipelines," Huang remarked. "By 2027, if you are not managing a fleet of AI agents to help you code, test, and deploy, you are effectively standing still while the world moves forward."</p>
      <p>Nvidia also unveiled its new "AI Factory" reference designs, aimed at transforming traditional data centers into high-efficiency environments specifically for training humanoid robot brains.</p>
    `,
    category_id: 'tech',
    category: { name: 'Technology', slug: 'tech', color: '#3b82f6' },
    author_id: '3',
    profiles: { full_name: 'David Lowery', avatar_url: 'https://i.pravatar.cc/150?u=david' },
    featured_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    published_at: '2026-03-29T09:15:00Z',
    views_count: 2300,
    slug: 'nvidia-jensen-huang-ai-proficiency',
    is_breaking: true,
    is_featured: false,
    is_trending: true
  },
  {
    id: '4',
    title: 'OpenAI Diverts Resources from Sora to Agentic Codex for Developers',
    excerpt: 'In a pivot to utility over spectacle, OpenAI is reportedly shifting focus away from video generation to its next-generation coding agent, Codex 2.0.',
    content: `
      <p>OpenAI is repositioning its research priorities. Internal memos suggest that the team behind Sora, the video generation model that captivated the internet in 2024, has been largely reassigned to "Agentic Codex."</p>
      <p>The goal is to move from AI that can "generate content" to AI that can "execute software." Codex 2.0 is expected to be a fully agentic system capable of understanding complex legacy codebases, refactoring them for performance, and even managing cloud deployments with minimal human supervision.</p>
      <p>This pivot highlights a broader industry trend toward "Organizational ROI," where businesses demand AI solutions that directly impact productivity rather than just providing creative inspiration.</p>
    `,
    category_id: 'ai',
    category: { name: 'AI', slug: 'ai', color: '#a855f7' },
    author_id: '4',
    profiles: { full_name: 'Elena Vance', avatar_url: 'https://i.pravatar.cc/150?u=elena' },
    featured_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    published_at: '2026-03-31T08:00:00Z',
    views_count: 4500,
    slug: 'openai-pivot-agentic-codex',
    is_breaking: true,
    is_featured: true,
    is_trending: true
  }
];

export const CATEGORIES = [
  { id: 'tech', name: 'Technology', slug: 'tech', color: '#3b82f6' },
  { id: 'business', name: 'Business', slug: 'business', color: '#10b981' },
  { id: 'ai', name: 'Artificial Intelligence', slug: 'ai', color: '#a855f7' },
  { id: 'gadgets', name: 'Gadgets', slug: 'gadgets', color: '#f59e0b' },
  { id: 'policy', name: 'Policy', slug: 'policy', color: '#ef4444' }
];
