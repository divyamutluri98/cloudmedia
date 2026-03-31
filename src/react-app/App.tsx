import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/react-app/pages/Home";
import ArticleDetail from "@/react-app/pages/public/ArticleDetail";
import CategoryPage from "@/react-app/pages/public/Category";
import Login from "@/react-app/pages/auth/Login";
import { InfoPage } from "@/react-app/pages/InfoPage";
import { Globe, Cpu, Briefcase, Shield, Info, Rocket, Zap, BarChart, Newspaper, DollarSign, Landmark, Home as HomeIcon, Award, MessageSquare } from 'lucide-react';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        
        {/* Corporate Pages - High Fidelity */}
        <Route path="/about" element={
          <InfoPage 
            title="About CloudMedia" 
            description="Leading the future of digital journalism through agentic AI and multi-lingual global networks."
            sections={[
              { title: "Our Mission", content: "To provide high-fidelity news to every corner of the globe in any language.", icon: Rocket },
              { title: "Agentic AI Core", content: "Powered by FastAPI, MCP and LangChain for real-time truth verification.", icon: Cpu },
              { title: "Global Impact", content: "Work on a news engine that speaks 56+ languages fluently.", icon: Globe }
            ]}
          />
        } />

        <Route path="/careers" element={
          <InfoPage 
            title="Join the Revolution" 
            description="We are looking for AI engineers, investigative journalists, and media innovators."
            sections={[
              { title: "Life at CloudMedia", content: "A culture of innovation, truth, and rapid AI-driven growth.", icon: Briefcase },
              { title: "Global Impact", content: "Work on a news engine that speaks 56+ languages fluently.", icon: Globe }
            ]}
          />
        } />

        <Route path="/press" element={
          <InfoPage 
            title="Press & Media Center" 
            description="Official news, assets, and media relations for the CloudMedia Network."
            industryCards={[
              { title: "Releases", desc: "Latest corporate announcements and updates.", icon: Newspaper },
              { title: "Assets", desc: "High-resolution logos and studio photos.", icon: Briefcase },
              { title: "Inquiries", desc: "Direct channel for media professionals.", icon: MessageSquare },
            ]}
            sections={[
              { title: "Media Relations", content: "Connecting journalists with our AI research and news desks.", icon: Award }
            ]}
          />
        } />

        <Route path="/advertise" element={
          <InfoPage 
            title="Advertise with Us" 
            description="Reach a global audience across 56+ languages with high-fidelity ad placement."
            industryCards={[
              { title: "Display", desc: "Premium placement in our news grid.", icon: Zap },
              { title: "Native", desc: "Integration into AI-generated summaries.", icon: Cpu },
              { title: "Network", desc: "Global reach across all industrial hubs.", icon: Globe },
            ]}
            sections={[
              { title: "Performance Data", content: "Transparency and real-time analytics for every campaign.", icon: BarChart }
            ]}
          />
        } />

        {/* Industry Hub Pages */}
        <Route path="/industry/it" element={
          <InfoPage 
            title="IT & Startup News" 
            description="Deep dives into Silicon Valley, Hyderabad Tech Scene, and Global AI Shifts."
            industryCards={[
              { title: "AI/ML", desc: "Latest in LLMs, Agents and MCP workflows.", icon: Cpu },
              { title: "Cloud Tech", desc: "Next-gen infrastructure and global networks.", icon: Zap },
              { title: "Startups", desc: "Funding, exits and disruptors worldwide.", icon: Rocket },
              { title: "Analytics", desc: "Data-driven insights into the IT market.", icon: BarChart },
            ]}
            sections={[
                { title: "The Indian IT Surge", content: "How Hyderabad and Bangalore are redefining global tech leadership.", icon: Globe },
                { title: "Next-Gen Workflows", content: "Integration of FastAPI and LangChain in media production.", icon: Zap }
            ]}
          />
        } />

        <Route path="/industry/finance" element={
          <InfoPage 
            title="Global Finance" 
            description="Real-time market analysis and economic reports for the high-stake investor."
            industryCards={[
              { title: "Markets", desc: "Global stock and commodity movements.", icon: BarChart },
              { title: "FinTech", desc: "The intersection of AI and monetary systems.", icon: Zap },
              { title: "Economy", desc: "Macro-economic shifts and policy impacts.", icon: Landmark },
            ]}
            sections={[
              { title: "The New Economy", content: "Analyzing the transition to digital-first global finance hubs.", icon: DollarSign }
            ]}
          />
        } />

        <Route path="/industry/govt" element={
          <InfoPage 
            title="Govt & Policy" 
            description="Unbiased reports on global governance, legislation, and international relations."
            sections={[
              { title: "Policy Analysis", content: "Deep dives into upcoming bills and regulatory shifts.", icon: Landmark },
              { title: "Diplomatic Core", content: "International relations in the age of global media.", icon: Globe }
            ]}
          />
        } />

        <Route path="/industry/real-estate" element={
          <InfoPage 
            title="Real Estate Insights" 
            description="Commercial and residential market trends across the world's major cities."
            sections={[
              { title: "Market Trends", content: "Urbanization, architectural shifts, and property values.", icon: HomeIcon },
              { title: "Architecture", content: "The future of smart cities and sustainable building.", icon: Cpu }
            ]}
          />
        } />

        {/* Legal & Trust Pages */}
        <Route path="/privacy" element={
          <InfoPage 
            title="Privacy First" 
            description="Your data is protected by the same high-standard AI models that verify our news."
            sections={[
              { title: "Data Security", content: "End-to-end encryption for all our subscribers and readers.", icon: Shield },
              { title: "Ethics in Data", content: "We never sell your information. Period.", icon: Info }
            ]}
          />
        } />

        <Route path="/terms" element={
          <InfoPage 
            title="Terms of Service" 
            description="Standard legal frameworks for our global news network."
            sections={[
              { title: "User Rights", content: "Understanding your rights as a reader of CloudMedia.", icon: Shield },
              { title: "Content Usage", content: "Guidelines for sharing and referencing our high-fidelity reports.", icon: Info }
            ]}
          />
        } />

        <Route path="/ethics" element={
          <InfoPage 
            title="Ethics & Standards" 
            description="Our commitment to journalistic integrity and truth in the AI era."
            sections={[
              { title: "Truth Protocol", content: "How we verify information across 56+ languages using MCP.", icon: Shield },
              { title: "Impartiality", content: "Maintaining a neutral voice in a polarized global landscape.", icon: Award }
            ]}
          />
        } />
      </Routes>
    </Router>
  );
}
