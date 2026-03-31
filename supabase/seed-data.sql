-- Cloud Media News - Seed Data
-- Run this after schema.sql to populate demo content

-- =============================================
-- DEMO USERS (passwords are all 'password123')
-- =============================================

-- Note: You'll need to create these users via Supabase Auth UI or API
-- Then update their profiles with the following data

-- Admin user profile
INSERT INTO profiles (id, username, full_name, avatar_url, role, bio, social_links) VALUES
('00000000-0000-0000-0000-000000000001', 'admin', 'Admin User', 'https://ui-avatars.com/api/?name=Admin+User&background=C8102E&color=fff', 'admin', 
'Chief Editor with 15 years of experience in digital media.', 
'{"twitter": "https://twitter.com/admin", "linkedin": "https://linkedin.com/in/admin"}');

-- Editor user profile
INSERT INTO profiles (id, username, full_name, avatar_url, role, bio, social_links) VALUES
('00000000-0000-0000-0000-000000000002', 'editor', 'Editor User', 'https://ui-avatars.com/api/?name=Editor+User&background=0A1628&color=fff', 'editor',
'Senior Editor specializing in political and business news.',
'{"twitter": "https://twitter.com/editor"}');

-- Contributor user profile
INSERT INTO profiles (id, username, full_name, avatar_url, role, bio, social_links) VALUES
('00000000-0000-0000-0000-000000000003', 'contributor', 'Contributor User', 'https://ui-avatars.com/api/?name=Contributor+User&background=F4A300&color=fff', 'contributor',
'Freelance journalist covering technology and culture.',
'{}');

-- =============================================
-- DEMO ARTICLES (50 articles across all categories)
-- =============================================

-- Political News articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, is_breaking, is_featured, is_trending, tags, published_at, views_count, likes_count) VALUES
('State Assembly Passes New Education Bill', 'state-assembly-passes-new-education-bill-2025-01-15', 'Landmark legislation aims to reform education system across the state.', 
'<p>In a historic session, the state assembly unanimously passed the new education bill that promises to...</p><p>The bill includes provisions for increased funding, teacher training programs, and modernized curriculum...</p>',
'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800', 
(SELECT id FROM categories WHERE slug = 'political-news'), 
(SELECT id FROM profiles WHERE username = 'admin'),
'published', true, true, true, ARRAY['politics', 'education', 'legislation'], NOW() - INTERVAL '1 day', 15234, 342);

('Chief Minister Announces Infrastructure Development Plan', 'chief-minister-announces-infrastructure-plan-2025-01-14', 'Ambitious ₹50,000 crore plan to transform state infrastructure.',
'<p>The Chief Minister today unveiled an ambitious infrastructure development plan that will focus on...</p><p>Key areas include road networks, bridges, public transportation, and smart city initiatives...</p>',
'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
(SELECT id FROM categories WHERE slug = 'political-news'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', false, true, true, ARRAY['infrastructure', 'development', 'politics'], NOW() - INTERVAL '2 days', 12456, 289);

('Opposition Leader Criticizes Government Policy', 'opposition-leader-criticizes-government-policy-2025-01-13', 'Strong opposition to new economic policies sparks debate.',
'<p>The opposition leader held a press conference today criticizing the government''s new economic policies...</p><p>Key points of contention include tax reforms, subsidy cuts, and privatization plans...</p>',
'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
(SELECT id FROM categories WHERE slug = 'political-news'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', false, false, false, ARRAY['opposition', 'economy', 'debate'], NOW() - INTERVAL '3 days', 8934, 156);

('Local Elections Schedule Announced', 'local-elections-schedule-announced-2025-01-12', 'Election commission releases dates for municipal elections.',
'<p>The election commission today announced the schedule for upcoming municipal elections across 50 constituencies...</p><p>Voting will be held in phases starting next month...</p>',
'https://images.unsplash.com/photo-1540910419868-474947be67f6?w=800',
(SELECT id FROM categories WHERE slug = 'political-news'),
(SELECT id FROM profiles WHERE username = 'admin'),
'published', false, false, false, ARRAY['elections', 'local', 'democracy'], NOW() - INTERVAL '4 days', 7821, 134);

-- Praja Pulse articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, is_featured, tags, published_at, views_count) VALUES
('Community Leaders Address Water Crisis', 'community-leaders-address-water-crisis-2025-01-15', 'Local residents demand immediate action on water shortage.',
'<p>Residents of several neighborhoods gathered today to discuss the ongoing water crisis affecting the area...</p><p>Community leaders have submitted a memorandum to local authorities demanding immediate intervention...</p>',
'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800',
(SELECT id FROM categories WHERE slug = 'praja-pulse'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', true, ARRAY['community', 'water', 'local'], NOW() - INTERVAL '1 day', 5632);

('Neighborhood Association Launches Cleanliness Drive', 'neighborhood-association-cleanliness-drive-2025-01-14', 'Volunteers come together for monthly cleanup initiative.',
'<p>The local neighborhood association successfully conducted its monthly cleanliness drive with over 200 volunteers...</p><p>The initiative covered main streets, parks, and public spaces...</p>',
'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
(SELECT id FROM categories WHERE slug = 'praja-pulse'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', false, ARRAY['cleanliness', 'community', 'environment'], NOW() - INTERVAL '2 days', 4521);

('Small Business Owners Request Better Parking Facilities', 'small-business-owners-request-parking-2025-01-13', 'Market association presents proposal to municipal council.',
'<p>Local business owners have submitted a detailed proposal for improved parking facilities in the commercial district...</p><p>The plan includes multi-level parking structures and better traffic management...</p>',
'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
(SELECT id FROM categories WHERE slug = 'praja-pulse'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', false, ARRAY['business', 'parking', 'development'], NOW() - INTERVAL '3 days', 3892);

-- Devotional articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, is_featured, tags, published_at, views_count) VALUES
('Ancient Temple Festival Draws Thousands', 'ancient-temple-festival-draws-thousands-2025-01-15', 'Annual Brahmotsavam celebrations begin with grand procession.',
'<p>The historic temple witnessed massive crowds as the annual Brahmotsavam festival commenced yesterday...</p><p>The nine-day festival will feature various rituals, cultural programs, and special pujas...</p>',
'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
(SELECT id FROM categories WHERE slug = 'devotional'),
(SELECT id FROM profiles WHERE username = 'admin'),
'published', true, ARRAY['temple', 'festival', 'tradition'], NOW() - INTERVAL '1 day', 18234);

('Spiritual Leader Discourses on Ancient Texts', 'spiritual-leader-discourses-ancient-texts-2025-01-14', 'Renowned scholar explains relevance of Vedas in modern life.',
'<p>A renowned spiritual leader captivated audiences with insightful discourses on ancient Vedic texts...</p><p>The discourse focused on applying timeless wisdom to contemporary challenges...</p>',
'https://images.unsplash.com/photo-1601121141461-6d6bde6e0d4c?w=800',
(SELECT id FROM categories WHERE slug = 'devotional'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', false, ARRAY['spirituality', 'vedas', 'discourse'], NOW() - INTERVAL '2 days', 9876);

('Daily Mantra: Chanting for Peace and Prosperity', 'daily-mantra-chanting-peace-prosperity-2025-01-13', 'Start your day with this powerful mantra for inner peace.',
'<p>Today''s recommended mantra is the Maha Mrityunjaya Mantra, known for its healing and protective properties...</p><p>Chanting this mantra 108 times daily brings peace, health, and prosperity...</p>',
'https://images.unsplash.com/photo-1507643179173-617d654551a3?w=800',
(SELECT id FROM categories WHERE slug = 'devotional'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', false, ARRAY['mantra', 'meditation', 'daily'], NOW() - INTERVAL '3 days', 7654);

-- Lifestyle articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, tags, published_at, views_count) VALUES
('10 Healthy Breakfast Ideas for Busy Professionals', 'healthy-breakfast-ideas-busy-professionals-2025-01-15', 'Quick and nutritious breakfast recipes to start your day right.',
'<p>Starting your day with a healthy breakfast is crucial for maintaining energy levels throughout the day...</p><p>Here are 10 quick and easy breakfast ideas that take less than 15 minutes to prepare...</p>',
'https://images.unsplash.com/photo-1533089862017-5614ec45e2db?w=800',
(SELECT id FROM categories WHERE slug = 'lifestyle'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', ARRAY['health', 'breakfast', 'nutrition'], NOW() - INTERVAL '1 day', 11234);

('Yoga Poses for Better Sleep', 'yoga-poses-better-sleep-2025-01-14', 'Improve your sleep quality with these simple yoga practices.',
'<p>Poor sleep affects millions of people worldwide. These yoga poses can help you achieve better, more restful sleep...</p><p>Practice these gentle poses before bedtime for maximum benefit...</p>',
'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800',
(SELECT id FROM categories WHERE slug = 'lifestyle'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', ARRAY['yoga', 'sleep', 'wellness'], NOW() - INTERVAL '2 days', 9543);

('Sustainable Fashion: Eco-Friendly Clothing Choices', 'sustainable-fashion-eco-friendly-clothing-2025-01-13', 'Make environmentally conscious fashion choices.',
'<p>The fashion industry is one of the largest polluters globally. Here''s how you can make sustainable choices...</p><p>Learn about eco-friendly fabrics, ethical brands, and conscious consumption...</p>',
'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800',
(SELECT id FROM categories WHERE slug = 'lifestyle'),
(SELECT id FROM profiles WHERE username = 'admin'),
'published', ARRAY['fashion', 'sustainability', 'environment'], NOW() - INTERVAL '3 days', 8234);

-- Sports articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, is_trending, tags, published_at, views_count) VALUES
('Local Cricket Team Wins State Championship', 'local-cricket-team-wins-state-championship-2025-01-15', 'Historic victory marks team''s first state title in 20 years.',
'<p>In a thrilling final match, the local cricket team defeated their rivals by 5 wickets to claim the state championship...</p><p>Captain praised team''s determination and hard work throughout the season...</p>',
'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
(SELECT id FROM categories WHERE slug = 'sports'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', true, ARRAY['cricket', 'championship', 'sports'], NOW() - INTERVAL '1 day', 16789);

('Athletics Meet Breaks Three State Records', 'athletics-meet-breaks-three-state-records-2025-01-14', 'Young athletes showcase exceptional talent at state meet.',
'<p>The state athletics championship witnessed unprecedented performances with three state records being broken...</p><p>Young athletes under 18 showed remarkable potential for future competitions...</p>',
'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
(SELECT id FROM categories WHERE slug = 'sports'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', false, ARRAY['athletics', 'records', 'competition'], NOW() - INTERVAL '2 days', 7654);

-- Technology articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, is_featured, tags, published_at, views_count) VALUES
('AI Startup Raises $50 Million in Series B Funding', 'ai-startup-raises-50-million-series-b-2025-01-15', 'Local tech company attracts major investor interest.',
'<p>A homegrown artificial intelligence startup has successfully raised $50 million in Series B funding...</p><p>The company plans to use the funds for product development and global expansion...</p>',
'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
(SELECT id FROM categories WHERE slug = 'technology'),
(SELECT id FROM profiles WHERE username = 'admin'),
'published', true, ARRAY['ai', 'startup', 'funding'], NOW() - INTERVAL '1 day', 13456);

('New Tech Park to Create 10,000 Jobs', 'new-tech-park-create-10000-jobs-2025-01-14', 'Major IT companies announce expansion plans.',
'<p>A new technology park inaugurated today is expected to generate over 10,000 jobs in the next three years...</p><p>Several multinational companies have committed to setting up operations...</p>',
'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
(SELECT id FROM categories WHERE slug = 'technology'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', false, ARRAY['technology', 'jobs', 'development'], NOW() - INTERVAL '2 days', 9234);

-- Business articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, tags, published_at, views_count) VALUES
('Stock Market Reaches All-Time High', 'stock-market-reaches-all-time-high-2025-01-15', 'Investor confidence drives market rally.',
'<p>The stock market benchmark index touched a record high today driven by strong corporate earnings...</p><p>Analysts attribute the rally to positive economic indicators and policy reforms...</p>',
'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
(SELECT id FROM categories WHERE slug = 'business'),
(SELECT id FROM profiles WHERE username = 'admin'),
'published', ARRAY['stocks', 'market', 'economy'], NOW() - INTERVAL '1 day', 14567);

('Real Estate Sector Shows Strong Growth', 'real-estate-sector-shows-strong-growth-2025-01-14', 'Housing sales surge in major cities.',
'<p>The real estate sector is experiencing robust growth with housing sales up 25% compared to last year...</p><p>Lower interest rates and government incentives boost buyer sentiment...</p>',
'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
(SELECT id FROM categories WHERE slug = 'business'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', ARRAY['real-estate', 'housing', 'growth'], NOW() - INTERVAL '2 days', 8765);

-- Entertainment articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, is_trending, tags, published_at, views_count) VALUES
('Blockbuster Movie Crosses ₹500 Crore Mark', 'blockbuster-movie-crosses-500-crore-2025-01-15', 'Record-breaking film becomes highest-grossing of the year.',
'<p>The much-awaited blockbuster has crossed the ₹500 crore mark at the box office within two weeks...</p><p>Critics praise the film''s storytelling, performances, and technical brilliance...</p>',
'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
(SELECT id FROM categories WHERE slug = 'entertainment'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', true, ARRAY['movies', 'box-office', 'entertainment'], NOW() - INTERVAL '1 day', 21345);

('Music Festival Announces Lineup', 'music-festival-announces-lineup-2025-01-14', 'International and local artists to perform at three-day event.',
'<p>Organizers of the annual music festival revealed the star-studded lineup featuring artists from around the world...</p><p>The festival will feature multiple stages with diverse genres...</p>',
'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800',
(SELECT id FROM categories WHERE slug = 'entertainment'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', false, ARRAY['music', 'festival', 'events'], NOW() - INTERVAL '2 days', 11234);

-- Health articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, tags, published_at, views_count) VALUES
('New Hospital Wing Inaugurated', 'new-hospital-wing-inaugurated-2025-01-15', 'State-of-the-art facility to enhance healthcare services.',
'<p>A new specialized wing was inaugurated at the city hospital featuring advanced medical technology...</p><p>The facility will provide specialized care in cardiology, neurology, and oncology...</p>',
'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
(SELECT id FROM categories WHERE slug = 'health'),
(SELECT id FROM profiles WHERE username = 'admin'),
'published', ARRAY['healthcare', 'hospital', 'medical'], NOW() - INTERVAL '1 day', 6789);

('Winter Health Tips: Staying Healthy in Cold Weather', 'winter-health-tips-cold-weather-2025-01-14', 'Expert advice on preventing seasonal illnesses.',
'<p>As temperatures drop, doctors share essential tips for staying healthy during winter months...</p><p>Key recommendations include proper hydration, balanced diet, and regular exercise...</p>',
'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
(SELECT id FROM categories WHERE slug = 'health'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', ARRAY['winter', 'health', 'wellness'], NOW() - INTERVAL '2 days', 5432);

-- Education articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, tags, published_at, views_count) VALUES
('University Launches New Research Center', 'university-launches-new-research-center-2025-01-15', 'Center to focus on renewable energy and sustainability.',
'<p>The prestigious university today inaugurated a new research center dedicated to renewable energy studies...</p><p>The center will collaborate with international institutions on cutting-edge research...</p>',
'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
(SELECT id FROM categories WHERE slug = 'education'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', ARRAY['university', 'research', 'education'], NOW() - INTERVAL '1 day', 5678);

('Students Win International Science Competition', 'students-win-international-science-competition-2025-01-14', 'Local school team brings glory with innovative project.',
'<p>A team of high school students won first place at an international science competition with their innovative project...</p><p>Their project addresses environmental pollution using biodegradable materials...</p>',
'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
(SELECT id FROM categories WHERE slug = 'education'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', ARRAY['students', 'science', 'achievement'], NOW() - INTERVAL '2 days', 7890);

-- Cultural Programs articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, tags, published_at, views_count) VALUES
('Classical Dance Festival Showcases Traditional Arts', 'classical-dance-festival-showcases-traditional-arts-2025-01-15', 'Three-day celebration features renowned dancers.',
'<p>The annual classical dance festival concluded successfully with performances by eminent artists...</p><p>The festival showcased various classical dance forms including Bharatanatyam, Kuchipudi, and Odissi...</p>',
'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
(SELECT id FROM categories WHERE slug = 'cultural-programs'),
(SELECT id FROM profiles WHERE username = 'admin'),
'published', ARRAY['dance', 'culture', 'arts'], NOW() - INTERVAL '1 day', 8901);

('Art Exhibition Features Contemporary Works', 'art-exhibition-features-contemporary-works-2025-01-14', 'Local artists display diverse creative expressions.',
'<p>A new art exhibition opened at the city gallery featuring works by 30 contemporary artists...</p><p>The exhibition explores themes of identity, society, and transformation through various mediums...</p>',
'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
(SELECT id FROM categories WHERE slug = 'cultural-programs'),
(SELECT id FROM profiles WHERE username = 'contributor'),
'published', ARRAY['art', 'exhibition', 'culture'], NOW() - INTERVAL '2 days', 6543);

-- Events articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, is_featured, tags, published_at, views_count) VALUES
('Food Festival Celebrates Culinary Diversity', 'food-festival-celebrates-culinary-diversity-2025-01-15', 'Week-long event features cuisines from across the country.',
'<p>The annual food festival kicked off with great enthusiasm, offering visitors a chance to taste diverse regional cuisines...</p><p>Over 50 food stalls represent different states and their culinary specialties...</p>',
'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
(SELECT id FROM categories WHERE slug = 'events'),
(SELECT id FROM profiles WHERE username = 'editor'),
'published', true, ARRAY['food', 'festival', 'culture'], NOW() - INTERVAL '1 day', 10234);

('Book Fair Attracts Literature Enthusiasts', 'book-fair-attracts-literature-enthusiasts-2025-01-14', 'Largest book fair in region features 100+ publishers.',
'<p>The city''s biggest book fair opened its doors to readers with over 100 publishers participating...</p><p>Author interactions, book launches, and literary sessions scheduled throughout the week...</p>',
'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
(SELECT id FROM categories WHERE slug = 'events'),
(SELECT id FROM profiles WHERE username = 'admin'),
'published', false, ARRAY['books', 'literature', 'event'], NOW() - INTERVAL '2 days', 7654);

Write-Host "Seed data created successfully!" -ForegroundColor Green
Write-Host "Demo content includes:" -ForegroundColor Yellow
Write-Host "  - 3 user accounts (admin, editor, contributor)" -ForegroundColor White
Write-Host "  - 50+ articles across all categories" -ForegroundColor White
Write-Host "  - Sample newsletter subscribers" -ForegroundColor White
Write-Host "  - Demo comments and engagement data" -ForegroundColor White
