export type Tool = {
  id: string;
  name: string;
  url: string;
  type: string;
  summary: string;
  tags: string[];
  categoryId: string;
  isPinned: boolean;
  createdAt: number;
};

export type Category = {
  id: string;
  name: string;
  collapsed: boolean;
  toolIds: string[]; // Order of tools
};

export type AppState = {
  categories: Category[];
  tools: Record<string, Tool>; // Normalized for easier lookup
  selectedToolId: string | null;
  searchQuery: string;
  isSidebarOpen: boolean;
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat_chatbots', name: 'Chatbots & Assistants', collapsed: false, toolIds: ['tool_openai', 'tool_clickup'] },
  { id: 'cat_image', name: 'Image & Creative', collapsed: false, toolIds: ['tool_google_labs', 'tool_reimagine', 'tool_simular'] },
  { id: 'cat_dev', name: 'Development & Agents', collapsed: false, toolIds: ['tool_adeptly', 'tool_punku'] },
];

export const INITIAL_TOOLS: Record<string, Tool> = {
  'tool_openai': {
    id: 'tool_openai',
    name: 'OpenAI ChatGPT',
    url: 'https://chat.openai.com',
    type: 'Chatbot',
    summary: 'Advanced AI language model for conversation, coding, and content generation.',
    tags: ['LLM', 'Productivity', 'General'],
    categoryId: 'cat_chatbots',
    isPinned: true,
    createdAt: Date.now(),
  },
  'tool_google_labs': {
    id: 'tool_google_labs',
    name: 'Google Labs CC',
    url: 'https://labs.google',
    type: 'Creative Suite',
    summary: 'Experimental AI tools and features from Google.',
    tags: ['Experimental', 'Google', 'Creative'],
    categoryId: 'cat_image',
    isPinned: false,
    createdAt: Date.now(),
  },
  'tool_reimagine': {
    id: 'tool_reimagine',
    name: 'REimagineHome.ai',
    url: 'https://reimaginehome.ai',
    type: 'Design Tool',
    summary: 'AI-powered interior design and virtual staging platform.',
    tags: ['Real Estate', 'Design', '3D'],
    categoryId: 'cat_image',
    isPinned: false,
    createdAt: Date.now(),
  },
  'tool_adeptly': {
    id: 'tool_adeptly',
    name: 'Adeptly',
    url: 'https://adeptly.ai',
    type: 'Agent Platform',
    summary: 'Build and deploy AI agents for various tasks.',
    tags: ['Agents', 'Automation', 'No-code'],
    categoryId: 'cat_dev',
    isPinned: false,
    createdAt: Date.now(),
  },
  'tool_punku': {
    id: 'tool_punku',
    name: 'PUNKU.ai',
    url: 'https://punku.ai',
    type: 'Developer Tool',
    summary: 'AI-powered development assistant.',
    tags: ['Coding', 'Developer Experience'],
    categoryId: 'cat_dev',
    isPinned: false,
    createdAt: Date.now(),
  },
  'tool_simular': {
    id: 'tool_simular',
    name: 'Simular AI',
    url: 'https://simular.ai',
    type: 'Simulation',
    summary: 'AI platform for creating realistic simulations.',
    tags: ['Simulation', 'Data', 'Modeling'],
    categoryId: 'cat_image', // Assuming creative/visual for now based on name
    isPinned: false,
    createdAt: Date.now(),
  },
  'tool_clickup': {
    id: 'tool_clickup',
    name: 'ClickUp Chat',
    url: 'https://clickup.com/features/chat',
    type: 'Productivity',
    summary: 'AI-integrated chat within ClickUp for task management.',
    tags: ['Project Management', 'Collaboration'],
    categoryId: 'cat_chatbots',
    isPinned: true,
    createdAt: Date.now(),
  },
};

export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
