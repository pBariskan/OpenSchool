export type LevelId = "explorer" | "engineer" | "researcher";

export type ActivityType =
  | "pixel-grid"
  | "card-sort"
  | "clustering"
  | "reward-loop"
  | "network-visualizer"
  | "confusion-matrix"
  | "concept-check";

export type AccessModel = "free" | "locked_future";

export type ModulePhase = {
  id: "hook" | "explain" | "simulate" | "recall" | "play" | "review";
  title: string;
  duration: string;
  purpose: string;
  summary: string;
  deliverables: string[];
};

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  prompt: string;
};

export type Module = {
  id: string;
  number: string;
  title: string;
  coreConcept: string;
  learningGoal: string;
  sections: string[];
  estimatedMinutes?: number;
  hookQuestion?: string;
  phaseDesign?: ModulePhase[];
  activity?: Activity;
};

export type Level = {
  id: LevelId;
  name: string;
  label: string;
  target: string;
  summary: string;
  price: number;
  priceLabel: string;
  access: AccessModel;
  accent: "teal" | "gold" | "coral";
  modules: Module[];
};

const explorerPhasePurposes = {
  hook: "Create curiosity before content is shown.",
  explain: "Deliver content in small, single-concept screens.",
  simulate: "Make the abstract tangible through manipulation.",
  recall: "Force retrieval before any review is offered.",
  play: "Reinforce with a short interactive challenge.",
  review: "Surface spaced-repetition questions from previous modules.",
} as const;

function explorerPhases(input: {
  hook: string;
  explain: string[];
  simulate: string[];
  recall: string[];
  play: string[];
  review: string[];
  simulateDuration?: string;
  playDuration?: string;
}): ModulePhase[] {
  return [
    {
      id: "hook",
      title: "Hook",
      duration: "~1 min",
      purpose: explorerPhasePurposes.hook,
      summary: input.hook,
      deliverables: ["Full-screen open-response prompt", "10+ character answer lock", "Answer saved locally for end-of-module reflection"],
    },
    {
      id: "explain",
      title: "Explain",
      duration: "~4 min",
      purpose: explorerPhasePurposes.explain,
      summary: "Four manual lesson screens, each with one concept, one visual, and one takeaway.",
      deliverables: input.explain,
    },
    {
      id: "simulate",
      title: "Simulate",
      duration: input.simulateDuration ?? "~3 min",
      purpose: explorerPhasePurposes.simulate,
      summary: input.simulate[0],
      deliverables: input.simulate,
    },
    {
      id: "recall",
      title: "Recall",
      duration: "~2 min",
      purpose: explorerPhasePurposes.recall,
      summary: "Three retrieval questions appear before review answers are shown.",
      deliverables: input.recall,
    },
    {
      id: "play",
      title: "Play",
      duration: input.playDuration ?? "~3 min",
      purpose: explorerPhasePurposes.play,
      summary: input.play[0],
      deliverables: input.play,
    },
    {
      id: "review",
      title: "Review",
      duration: "~1 min",
      purpose: explorerPhasePurposes.review,
      summary: input.review[0],
      deliverables: input.review,
    },
  ];
}

const explorerModules: Module[] = [
  {
    id: "what-is-ai",
    number: "M1",
    title: "What Is AI, Really?",
    coreConcept: "Intelligence vs. automation",
    learningGoal: "Explain what AI is and is not without using buzzwords.",
    sections: ["The Word 'Intelligence'", "AI vs. a Normal Program", "A Very Short History", "Types of AI Today"],
    activity: {
      id: "ai-or-program",
      type: "concept-check",
      title: "AI or normal program?",
      prompt: "Classify everyday systems by whether they follow fixed rules or learn from examples.",
    },
  },
  {
    id: "machines-see-world",
    number: "M2",
    title: "How Machines See the World",
    coreConcept: "Data as numbers",
    learningGoal: "Explain how images, text, and sound become data.",
    sections: ["Everything Is a Number", "Data: The Raw Material", "Input and Output"],
    activity: {
      id: "pixel-smile",
      type: "pixel-grid",
      title: "Pixel grid decoder",
      prompt: "Turn a tiny picture into numbers and back again.",
    },
  },
  {
    id: "learning-from-examples",
    number: "M3",
    title: "Learning from Examples",
    coreConcept: "Pattern recognition & supervised learning",
    learningGoal: "Explain supervised learning and give original pattern-recognition examples.",
    sections: ["What Is a Pattern?", "Supervised Learning", "The Generalisation Idea", "Labels and Training Data"],
    activity: {
      id: "training-cards",
      type: "card-sort",
      title: "Training-card sorter",
      prompt: "Use labelled examples to infer the rule behind new cards.",
    },
  },
  {
    id: "finding-groups",
    number: "M4",
    title: "Finding Groups: Unsupervised Learning",
    coreConcept: "Clustering & discovery without labels",
    learningGoal: "Explain the difference between supervised and unsupervised learning.",
    sections: ["Learning Without a Teacher", "Clustering", "Real-World Uses of Unsupervised Learning"],
    activity: {
      id: "cluster-lab",
      type: "clustering",
      title: "Cluster lab",
      prompt: "Move points into natural groups without seeing labels.",
    },
  },
  {
    id: "learning-by-reward",
    number: "M5",
    title: "Learning by Reward: Reinforcement Learning",
    coreConcept: "Trial, error, and feedback loops",
    learningGoal: "Explain reinforcement learning with reward and punishment.",
    sections: ["A Third Way of Learning", "Reward and Punishment", "Famous Examples", "Why RL Is Hard"],
    activity: {
      id: "reward-loop",
      type: "reward-loop",
      title: "Reward loop",
      prompt: "Choose actions and watch the agent learn from score feedback.",
    },
  },
  {
    id: "neural-network-shape",
    number: "M6",
    title: "What a Neural Network Looks Like",
    coreConcept: "Neurons & layers",
    learningGoal: "Draw a 3-layer neural network and explain what each layer does.",
    sections: ["The Brain Metaphor", "Artificial Neurons", "Input, Hidden, Output", "Deep Learning"],
    activity: {
      id: "network-visualizer",
      type: "network-visualizer",
      title: "Layer builder",
      prompt: "Adjust the hidden layer and inspect how information flows.",
    },
  },
  {
    id: "training-gets-smarter",
    number: "M7",
    title: "Training: How AI Gets Smarter",
    coreConcept: "The training loop",
    learningGoal: "Narrate training as guess, check, adjust, repeat.",
    sections: ["The Training Loop", "Weights", "Transfer Learning", "Overfitting"],
    activity: {
      id: "guess-check-adjust",
      type: "concept-check",
      title: "Training loop sequencer",
      prompt: "Put the loop steps in order and identify where feedback enters.",
    },
  },
  {
    id: "ai-making-decisions",
    number: "M8",
    title: "AI Making Decisions",
    coreConcept: "Classification, prediction, generation",
    learningGoal: "Give real-world examples of classification, prediction, and generation.",
    sections: ["Classification", "Prediction", "Generation"],
    activity: {
      id: "decision-types",
      type: "concept-check",
      title: "Decision type match",
      prompt: "Match AI products to classification, prediction, or generation.",
    },
  },
  {
    id: "when-ai-wrong",
    number: "M9",
    title: "When AI Gets It Wrong",
    coreConcept: "Errors, bias, hallucination",
    learningGoal: "Explain four ways AI fails and why they are not just bugs.",
    sections: ["AI Is Not Always Right", "Bias", "Confidence Without Understanding", "Edge Cases", "Privacy"],
    activity: {
      id: "failure-detective",
      type: "concept-check",
      title: "Failure detective",
      prompt: "Identify the failure mode behind real AI mistakes.",
    },
  },
  {
    id: "ai-in-your-life",
    number: "M10",
    title: "AI in Your Life",
    coreConcept: "Real-world applications everywhere",
    learningGoal: "Identify AI in daily products and describe the task each performs.",
    sections: ["Recommendations", "Voice and Language", "Images and Video", "Search", "Science", "Creative Tools"],
    activity: {
      id: "daily-ai-map",
      type: "concept-check",
      title: "Daily AI map",
      prompt: "Place common tools on a map of AI task types.",
    },
  },
  {
    id: "limits-and-future",
    number: "M11",
    title: "What AI Cannot Do — and What Comes Next",
    coreConcept: "Limits, myths, ethics, and the future",
    learningGoal: "Debunk common myths and explain alignment in plain English.",
    sections: ["AI Does Not Understand", "AI Is Not Conscious", "Reasoning Limits", "Goals and Motives", "Alignment", "Who Decides?"],
    activity: {
      id: "myth-buster",
      type: "concept-check",
      title: "Myth buster",
      prompt: "Separate accurate AI claims from science-fiction shortcuts.",
    },
  },
];

const explorerModuleDesigns: Record<string, Pick<Module, "estimatedMinutes" | "hookQuestion" | "phaseDesign">> = {
  "what-is-ai": {
    estimatedMinutes: 14,
    hookQuestion: "Which statement best describes what current AI is doing when it looks intelligent?",
    phaseDesign: explorerPhases({
      hook: "Activate prior beliefs about intelligence and consciousness before correcting common misconceptions.",
      explain: [
        "AI is not magic: intelligence means taking in information and producing a useful output.",
        "Normal programs follow hand-written rules; AI systems learn useful rules from examples.",
        "AI exists now because the old recipe finally met enough data and compute.",
        "Narrow AI exists today; general AI is still science fiction.",
      ],
      simulate: [
        "Side-by-side spam filter demo comparing brittle IF/THEN rules with a learning-based system.",
        "Rule-based panel starts with fixed spam rules, then fails on new phrasing.",
        "Learning-based panel simulates training accuracy rising from 40% to 98% and generalising to new spam.",
      ],
      recall: [
        "Open response: explain the core difference between a normal program and an AI program.",
        "Multiple choice: identify a spam filter as narrow AI.",
        "Free recall: name an AI-powered product used in the last 24 hours and what it learned from.",
      ],
      play: [
        "Drag-and-drop AI vs. Not AI sorting game with 8 everyday systems.",
        "Includes intentional tricky cases such as alphabetical search vs. Google Search-style AI.",
        "Score bands: AI Expert, Good instincts, Getting there, or needs review.",
      ],
      review: [
        "Special first-module reflection: show the learner's Hook answer beside the learning goal.",
        "Ask whether their thinking was pretty close, somewhat different, or very different.",
      ],
    }),
  },
  "machines-see-world": {
    estimatedMinutes: 15,
    hookQuestion: "Look at the photo below. A computer needs to 'see' this photo. But computers only understand numbers. How do you think a photo becomes a number?",
    phaseDesign: explorerPhases({
      hook: "Create surprise around the fact that computers do not see objects, only numerical representations.",
      explain: [
        "A computer does not see; it reads numbers in a pixel grid.",
        "Text and sound are numbers too: word IDs and sampled air-pressure values.",
        "Data is the raw material, and quality matters as much as quantity.",
        "Every AI system can be described as input in, output out.",
      ],
      simulate: [
        "Pixel grid explorer with 0-255 cell values and live brightness updates.",
        "Input/output identifier cards for spam filters, translation apps, recommenders, cars, assistants, and scan readers.",
        "Optional RGB mode shows that a colour pixel is three numbers, not one.",
      ],
      recall: [
        "Multiple choice: estimate the order of magnitude of numbers in a smartphone photo.",
        "True/false: text AI and image AI ultimately both process numbers.",
        "Open response: pick an AI system and identify its input and output.",
      ],
      play: [
        "Data-type matching puzzle connecting real-world objects to numerical representations.",
        "Corrupted data challenge where fixing wrong pixel values repairs a glitched image.",
      ],
      review: [
        "Spaced review from M1: rule-based vs. AI program and whether general AI exists today.",
      ],
    }),
  },
  "learning-from-examples": {
    estimatedMinutes: 15,
    hookQuestion: "Imagine you need to teach a 2-year-old what a 'dog' is. You cannot explain it in words. How would you do it?",
    phaseDesign: explorerPhases({
      hook: "Prime the learner with the same intuition supervised learning uses: show many examples.",
      explain: [
        "A pattern is anything that repeats.",
        "Supervised learning means learning with a teacher: labelled examples.",
        "Generalisation is the point; memorisation is not learning.",
        "Labels and training data define what the AI can learn.",
      ],
      simulate: [
        "Build your own spam filter by labelling 15 emails as spam or not spam.",
        "A simulated model trains on the learner's labels, then predicts 5 new unseen emails.",
        "Inconsistent labels produce a confused AI, making label quality tangible.",
      ],
      recall: [
        "Ordering task: collect examples, label them, show them to AI, predict on new data.",
        "Scenario question: why 95% training accuracy may just mean memorisation.",
        "Open recall: give two everyday pattern-recognition examples.",
      ],
      play: [
        "Label the training set: classify 24 animal images as Cat, Dog, or Not sure.",
        "The model copies uncertain or questionable labels, showing that AI learns what it is told.",
      ],
      review: [
        "Spaced review from M1 and M2: image storage and narrow AI.",
      ],
    }),
  },
  "finding-groups": {
    estimatedMinutes: 14,
    hookQuestion: "You are handed a box of 100 foreign coins you have never seen before. No labels, no instructions. What would you do to organise them?",
    phaseDesign: explorerPhases({
      hook: "Connect unsupervised learning to the natural human instinct to sort by similarity.",
      explain: [
        "Sometimes there is data but no teacher and no labels.",
        "Clustering finds natural groups by similarity.",
        "Unsupervised learning can reveal customer segments, music tastes, or fraud outliers.",
        "The groups found depend on what similarity means.",
      ],
      simulate: [
        "Watch clustering happen on 60 grey dots that slowly form three coloured groups.",
        "Cluster centres move over several animated steps until stable.",
        "Resetting or dragging starting centres shows that initial conditions can matter.",
      ],
      recall: [
        "Classify four scenarios as supervised or unsupervised.",
        "Short answer: explain why unsupervised learning can help detect fraud without many fraud labels.",
      ],
      play: [
        "Sort 20 streaming-service users into three listener groups using their behaviour data.",
        "Compare the learner's groups with a simulated clustering algorithm and discuss subjectivity.",
      ],
      review: [
        "Spaced review from M2 and M3: generalisation and all data becoming numbers.",
      ],
    }),
  },
  "learning-by-reward": {
    estimatedMinutes: 15,
    hookQuestion: "Think about how you learned to ride a bike. Did someone give you a manual of rules? Or did you figure it out through trial and error?",
    phaseDesign: explorerPhases({
      hook: "Anchor reinforcement learning in the learner's own trial-and-error experience.",
      explain: [
        "Reinforcement learning is a third way: action, outcome, adjust.",
        "The agent acts in an environment and tries to maximise total reward.",
        "Examples include AlphaGo, game-playing agents, robot arms, and human feedback.",
        "Delayed feedback creates the credit assignment problem.",
      ],
      simulate: [
        "Train a dog-like RL agent by rewarding or ignoring random actions.",
        "After repeated rewards, the policy shifts toward the rewarded action.",
        "Random rewards create erratic behaviour, showing that the agent optimises feedback, not meaning.",
      ],
      recall: [
        "Match Agent, Environment, Reward, and Action to their definitions.",
        "Scenario analysis: identify reward hacking when a robot maximises speed by falling forward.",
      ],
      play: [
        "Design the reward signal for a video recommender: watch time, ratings, or videos per session.",
        "Fast-forward outcomes show how each proxy can distort the intended goal.",
      ],
      review: [
        "Spaced review from M3 and M4: supervised vs. unsupervised and why training accuracy can mislead.",
      ],
    }),
  },
  "neural-network-shape": {
    estimatedMinutes: 15,
    hookQuestion: "You have probably heard the term 'neural network'. Before we explain it — what do you think it is?",
    phaseDesign: explorerPhases({
      hook: "Expose the brain metaphor before separating biology from the simple math model.",
      explain: [
        "AI borrows one brain idea: many simple connected units can produce complex behaviour.",
        "An artificial neuron multiplies inputs by weights, adds them, and outputs one number.",
        "Input, hidden, and output layers transform information step by step.",
        "Deep means more hidden layers, not deeper understanding.",
      ],
      simulate: [
        "Interactive neural network explorer with input, hidden, and output nodes.",
        "Activation values flow through the network, and connection weights can be inspected.",
        "Presets show confident, confused, and wrong outputs from the same structure.",
      ],
      recall: [
        "Draw and self-check a 3-layer neural network.",
        "Multiple choice: identify what a single artificial neuron actually does.",
        "Short explanation: define what deep means in deep learning.",
      ],
      play: [
        "Connect the network by drawing all required layer-to-layer connections.",
        "A bonus second hidden layer reveals why each new layer increases the number of weights.",
      ],
      review: [
        "Spaced review from M4 and M5: reward maximisation and clustering unlabeled customers.",
      ],
      simulateDuration: "~4 min",
    }),
  },
  "training-gets-smarter": {
    estimatedMinutes: 15,
    hookQuestion: "Have you ever practised a skill hundreds of times until you got good at it? What feedback told you when you were wrong?",
    phaseDesign: explorerPhases({
      hook: "Tie training to practice, feedback, adjustment, and repetition.",
      explain: [
        "Training is a loop: example, prediction, error, weight update, repeat.",
        "The error is a number called loss, and training tries to reduce it.",
        "Weights encode what the AI has learned.",
        "Transfer learning starts from pre-trained weights instead of training from scratch.",
      ],
      simulate: [
        "Train a 0-vs-1 number recogniser across 1, 10, 100, and 10,000 epochs.",
        "Loss drops as weights become structured, then overfitting appears when training goes too far.",
        "A weight-map view changes from noise to pattern as training progresses.",
      ],
      recall: [
        "Fill in the five steps of the training loop.",
        "Analogy question: rote re-reading vs. overfitting.",
        "Short answer: explain transfer learning and why it reduces cost.",
      ],
      play: [
        "Control training with sliders for epochs, data quality, and model size.",
        "Results show training accuracy, test accuracy, and consequences such as undertraining or overfitting.",
      ],
      review: [
        "Spaced review from M5 and M6: weights and reward-signal mismatch.",
      ],
      simulateDuration: "~4 min",
    }),
  },
  "ai-making-decisions": {
    estimatedMinutes: 14,
    hookQuestion: "Is 'cat or dog' the same kind of problem as 'how much will this house cost' or 'write me a poem'? How are they different?",
    phaseDesign: explorerPhases({
      hook: "Surface the learner's intuition that classification, regression, and generation are different task types.",
      explain: [
        "Classification puts an input into a fixed label box.",
        "Prediction or regression estimates a number on a continuous scale.",
        "Generation creates new text, images, or media from learned patterns.",
        "Real products often combine several task types.",
      ],
      simulate: [
        "Three hands-on demo panels: fake image classifier, house-price predictor, and next-word generator.",
        "Learners compare confidence scores, continuous outputs, and generated continuations.",
      ],
      recall: [
        "Label six systems as Classification, Regression, or Generation.",
        "Conceptual response: explain why ChatGPT's creativity is pattern-based rather than human-like invention.",
      ],
      play: [
        "Build an AI product by selecting 1-3 building blocks such as image classifier, text generator, and number predictor.",
        "Compare the selected blocks to real product combinations like voice assistants and cancer screening tools.",
      ],
      review: [
        "Spaced review from M6 and M7: loss and neural-network input layers.",
      ],
    }),
  },
  "when-ai-wrong": {
    estimatedMinutes: 15,
    hookQuestion: "Have you ever gotten a recommendation from YouTube, Spotify, or Netflix that was so wrong it was almost funny? What do you think went wrong?",
    phaseDesign: explorerPhases({
      hook: "Make AI failure concrete through a familiar recommendation mistake.",
      explain: [
        "AI fails regularly; the key questions are how often, how badly, and where.",
        "Bias comes from patterns in training data.",
        "Hallucination is confident text prediction, not truth checking.",
        "Edge cases and privacy leaks are structural risks, not simple bugs.",
      ],
      simulate: [
        "Spot the failure mode across six AI interaction cards.",
        "Classify each card as Bias, Hallucination, Edge case, Privacy, or None.",
      ],
      recall: [
        "True/false with justification: bias and hallucination are not merely unfixed software bugs.",
        "Scenario reasoning: deploying a model trained in Norway in a Nigerian hospital creates distribution shift risk.",
      ],
      play: [
        "Audit the AI: evaluate a bank loan model using training data, overall accuracy, and confidence.",
        "Answer audit questions about historical discrimination, hidden subgroup accuracy, edge cases, and human review.",
      ],
      review: [
        "Spaced review from M7 and M8: spam-filter task type and overfitting.",
      ],
    }),
  },
  "ai-in-your-life": {
    estimatedMinutes: 13,
    hookQuestion: "Before reading anything: how many AI systems do you think you interacted with today? Take a guess and list as many as you can.",
    phaseDesign: explorerPhases({
      hook: "Let learners underestimate their AI exposure, then compare that guess to a real daily timeline.",
      explain: [
        "Recommendations shape what billions of people watch, read, and buy.",
        "Voice assistants combine speech-to-text, language understanding, and response generation.",
        "Images and video use classification, clustering, detection, and overlays.",
        "Healthcare, science, and climate applications can be high-impact but less visible.",
      ],
      simulate: [
        "A day-in-AI timeline from 7am to 11pm with yes/no AI involvement guesses.",
        "After all slots, reveal systems and task types, then compare to the Hook estimate.",
      ],
      recall: [
        "Rapidly tag eight AI applications as classification, regression, generation, or clustering.",
        "Values reflection: identify the most positive and most concerning AI application.",
      ],
      play: [
        "AI or Not AI speed round with 30 products and intentionally tricky cases.",
        "Review the five trickiest answers with short explanations.",
      ],
      review: [
        "Spaced review from M8 and M9: hallucination and examples of classification, regression, and generation.",
      ],
      simulateDuration: "~2 min",
    }),
  },
  "limits-and-future": {
    estimatedMinutes: 16,
    hookQuestion: "What is the most dangerous or scary thing about AI, in your opinion? And separately — what is the most exciting?",
    phaseDesign: explorerPhases({
      hook: "Start from the learner's fears and hopes, then replace both myths and naive optimism with a grounded model.",
      explain: [
        "AI does not understand language; it predicts likely continuations.",
        "Current AI is not conscious, self-aware, or feeling anything.",
        "AI does not want things; risk comes from misspecified objectives.",
        "AI cannot reason reliably, and alignment remains unsolved.",
      ],
      simulate: [
        "Myth-busting challenge with six true/false/partially-true statements.",
        "Explanations reinforce narrow AI, confidence vs. correctness, bias, reward hacking, and non-malice.",
      ],
      recall: [
        "Final synthesis: explain why conscious takeover is not the right risk model.",
        "Open question prompt: name a genuine AI research question experts still debate.",
      ],
      play: [
        "Section 1 boss challenge: 15-question rapid-fire quiz covering all Explorer modules.",
        "Breakdown by module recommends review where score is below 50%.",
      ],
      review: [
        "Spaced review from M9 and M10, then Section 1 completion animation and progress badge.",
      ],
      playDuration: "~4 min",
    }),
  },
};

for (const explorerModule of explorerModules) {
  Object.assign(explorerModule, explorerModuleDesigns[explorerModule.id]);
}

const engineerModules: Module[] = [
  {
    id: "data-representation",
    number: "M1",
    title: "Data & Representation",
    coreConcept: "Vectors, features, encoding, normalisation",
    learningGoal: "Convert real-world objects into feature vectors and explain representation choices.",
    sections: ["Feature Vectors", "Types of Features", "Dimensionality", "Normalisation", "Train/Validation/Test Split"],
  },
  {
    id: "learning-problem",
    number: "M2",
    title: "The Learning Problem",
    coreConcept: "Formalising supervised learning",
    learningGoal: "Define supervised learning as finding f(x) approximately y and explain overfitting curves.",
    sections: ["Formalising the Goal", "Underfitting vs. Overfitting", "Bias-Variance Tradeoff"],
  },
  {
    id: "classical-ml",
    number: "M3",
    title: "Classical ML Algorithms",
    coreConcept: "Decision trees, forests, k-means, k-NN",
    learningGoal: "Choose suitable classical algorithms and explain ensemble advantages.",
    sections: ["Decision Trees", "Random Forests", "Gradient Boosting", "k-NN", "K-Means", "Algorithm Choice"],
  },
  {
    id: "linear-models",
    number: "M4",
    title: "Linear Models",
    coreConcept: "Weighted sums and decision boundaries",
    learningGoal: "Write linear model equations and explain why linear models cannot solve XOR.",
    sections: ["Weighted Sum", "Linear Regression", "Logistic Regression", "The XOR Problem"],
  },
  {
    id: "loss-functions",
    number: "M5",
    title: "Loss Functions",
    coreConcept: "MSE, cross-entropy, loss choice",
    learningGoal: "Compute common losses by hand and explain why loss choice matters.",
    sections: ["What Is Loss?", "Mean Squared Error", "Binary Cross-Entropy", "Loss as Value Judgement"],
  },
  {
    id: "gradient-descent",
    number: "M6",
    title: "Gradient Descent",
    coreConcept: "Optimisation, learning rate, SGD, Adam",
    learningGoal: "Explain gradient descent, learning rate, SGD, mini-batches, and Adam.",
    sections: ["Optimisation Problem", "Gradient Direction", "Update Rule", "SGD and Mini-Batches", "Adam"],
  },
  {
    id: "model-evaluation",
    number: "M7",
    title: "Model Evaluation",
    coreConcept: "Confusion matrix, precision, recall, F1, AUC",
    learningGoal: "Build a confusion matrix and explain when accuracy is misleading.",
    sections: ["Confusion Matrix", "Accuracy Limits", "Precision and Recall", "F1 and ROC-AUC", "K-Fold Cross-Validation"],
    activity: {
      id: "confusion-matrix",
      type: "confusion-matrix",
      title: "Confusion matrix playground",
      prompt: "Adjust prediction counts and compare accuracy, precision, recall, and F1.",
    },
  },
  {
    id: "nn-architecture",
    number: "M8",
    title: "Neural Networks: Architecture",
    coreConcept: "Layers, activations, depth",
    learningGoal: "Design a simple network and justify activation and depth choices.",
    sections: ["Universal Approximation", "Activation Functions", "Width vs. Depth", "Backpropagation Intuition"],
  },
  {
    id: "training-practice",
    number: "M9",
    title: "Training in Practice",
    coreConcept: "Batches, epochs, overfitting, regularisation",
    learningGoal: "Read loss curves, diagnose fit problems, and explain regularisation techniques.",
    sections: ["Epochs and Batches", "Reading Loss Curves", "Regularisation", "Hyperparameters"],
  },
  {
    id: "embeddings",
    number: "M10",
    title: "Embeddings & Representations",
    coreConcept: "Word2Vec and semantic spaces",
    learningGoal: "Explain embeddings, word2vec intuition, and representation learning.",
    sections: ["What Is an Embedding?", "Word2Vec", "Why Embeddings Matter", "Contextual Embeddings", "Embedding Space"],
  },
  {
    id: "convolutional-networks",
    number: "M11",
    title: "Convolutional Networks",
    coreConcept: "Filters, pooling, image hierarchy",
    learningGoal: "Explain why CNNs work for images and trace pixels to predictions.",
    sections: ["Flat Image Problem", "Convolution", "Pooling", "Hierarchical Feature Learning"],
  },
  {
    id: "sequence-models",
    number: "M12",
    title: "Sequence Models & Language",
    coreConcept: "RNNs, LSTMs, attention, Transformers",
    learningGoal: "Explain sequence-model challenges and the advantage of attention.",
    sections: ["Why Sequences Are Hard", "RNNs", "LSTMs", "Attention", "Transformers"],
  },
  {
    id: "generative-ai",
    number: "M13",
    title: "Generative AI",
    coreConcept: "Language models and diffusion",
    learningGoal: "Explain next-token prediction, temperature, and diffusion intuition.",
    sections: ["What Generative Means", "Next-Token Prediction", "Diffusion Models", "Prompt Interface", "Limitations"],
  },
  {
    id: "transfer-finetuning",
    number: "M14",
    title: "Transfer Learning & Fine-Tuning",
    coreConcept: "Pre-trained models, BERT, GPT, prompting",
    learningGoal: "Compare fine-tuning, prompting, PEFT, BERT, and GPT pre-training objectives.",
    sections: ["Training Cost", "Pre-Training + Fine-Tuning", "BERT", "GPT", "PEFT", "Prompting"],
  },
  {
    id: "fairness-bias-safety",
    number: "M15",
    title: "Fairness, Bias & Safety",
    coreConcept: "Technical and ethical dimensions",
    learningGoal: "Name sources of bias and describe technical safety approaches.",
    sections: ["Sources of Bias", "Fairness Tradeoffs", "Safety and Alignment", "Engineering Responsibility"],
  },
];

const researcherModules: Module[] = [
  {
    id: "math-foundations",
    number: "M1",
    title: "Mathematical Foundations",
    coreConcept: "Linear algebra, calculus, SVD",
    learningGoal: "Apply linear algebra and calculus in ML contexts including SVD and Jacobians.",
    sections: ["Linear Algebra", "SVD", "Jacobians and Chain Rule", "Probability"],
  },
  {
    id: "probability-information",
    number: "M2",
    title: "Probability & Information Theory",
    coreConcept: "Entropy, KL divergence, MLE",
    learningGoal: "Derive cross-entropy and explain KL divergence and information bottlenecks.",
    sections: ["Shannon Entropy", "KL Divergence", "Cross-Entropy and MLE", "Mutual Information"],
  },
  {
    id: "optimisation-deep-dive",
    number: "M3",
    title: "Optimisation Deep Dive",
    coreConcept: "Adam derivation and loss landscapes",
    learningGoal: "Derive Adam, explain second-order methods, and describe transformer schedules.",
    sections: ["Gradient Descent Family", "RMSProp and Adam", "Second-Order Methods", "Loss Geometry", "Learning Rate Schedules"],
  },
  {
    id: "backprop-derivation",
    number: "M4",
    title: "Backpropagation: Full Derivation",
    coreConcept: "Computational graphs and delta rule",
    learningGoal: "Derive backpropagation and implement it manually for a 2-layer network.",
    sections: ["Computational Graphs", "Forward Pass", "Backward Pass", "Vanishing and Exploding Gradients", "Initialisation"],
  },
  {
    id: "generalisation-theory",
    number: "M5",
    title: "Generalisation Theory",
    coreConcept: "PAC, VC dimension, double descent",
    learningGoal: "State PAC learning, define VC dimension, and connect regularisation to generalisation.",
    sections: ["PAC Learning", "VC Dimension", "Bias-Variance Formalism", "Double Descent"],
  },
  {
    id: "cnn-full-detail",
    number: "M6",
    title: "CNN Full Detail",
    coreConcept: "Receptive fields, ResNets, BatchNorm",
    learningGoal: "Compute convolution dimensions and explain ResNets, BatchNorm, EfficientNet, and ViT.",
    sections: ["Formal Convolution", "Residual Networks", "Batch Normalisation", "Modern Architecture Design"],
  },
  {
    id: "transformer-architecture",
    number: "M7",
    title: "Transformer Architecture",
    coreConcept: "Self-attention and positional encoding",
    learningGoal: "Derive scaled dot-product attention and compare BERT, GPT, and T5.",
    sections: ["Self-Attention", "Multi-Head Attention", "Positional Encoding", "Transformer Block", "Pre-Training Objectives"],
  },
  {
    id: "generative-landscape",
    number: "M8",
    title: "Generative Models: Full Landscape",
    coreConcept: "VAEs, GANs, diffusion",
    learningGoal: "Derive VAE ELBO, explain GAN dynamics, and trace DDPM procedures.",
    sections: ["VAEs", "GAN Training", "Diffusion Models"],
  },
  {
    id: "reinforcement-learning",
    number: "M9",
    title: "Reinforcement Learning",
    coreConcept: "MDPs, policy gradients, PPO, RLHF",
    learningGoal: "Formulate MDPs, derive policy gradients, and explain PPO and RLHF.",
    sections: ["MDPs", "Value Functions", "Policy Gradient", "PPO", "RLHF"],
  },
  {
    id: "pretraining-paradigms",
    number: "M10",
    title: "Pre-Training Paradigms",
    coreConcept: "Self-supervised and contrastive learning",
    learningGoal: "Distinguish language, vision, and contrastive pre-training objectives.",
    sections: ["Self-Supervision", "Language Objectives", "Vision Pre-Training", "Contrastive Learning", "Capability Shaping"],
  },
  {
    id: "scaling-laws",
    number: "M11",
    title: "Scaling Laws & Emergence",
    coreConcept: "Chinchilla, emergence, test-time compute",
    learningGoal: "State scaling laws and reason about compute, data, parameters, and emergence.",
    sections: ["Neural Scaling Laws", "Chinchilla", "Emergent Abilities", "Inference-Time Scaling"],
  },
  {
    id: "model-efficiency",
    number: "M12",
    title: "Knowledge Distillation & Efficiency",
    coreConcept: "Distillation, quantisation, pruning, MoE",
    learningGoal: "Explain distillation, soft labels, quantisation, pruning, and mixture-of-experts.",
    sections: ["Knowledge Distillation", "Quantisation", "Pruning", "Mixture of Experts"],
  },
  {
    id: "interpretability",
    number: "M13",
    title: "Interpretability",
    coreConcept: "Probing, superposition, circuits",
    learningGoal: "Apply probing analysis and critique mechanistic interpretability limitations.",
    sections: ["Why Interpretability Matters", "Probing", "Superposition", "Circuits", "Sparse Autoencoders"],
  },
  {
    id: "technical-ai-safety",
    number: "M14",
    title: "AI Safety: Technical Foundations",
    coreConcept: "Alignment, robustness, oversight",
    learningGoal: "Define alignment formally and compare robustness and oversight approaches.",
    sections: ["Alignment Problem", "Reward Hacking", "Adversarial Robustness", "Constitutional AI", "Scalable Oversight"],
  },
  {
    id: "frontier-topics",
    number: "M15",
    title: "Frontier Architectures & Topics",
    coreConcept: "GNNs, SSMs, agents, multimodal models",
    learningGoal: "Explain frontier model families and situate open research questions.",
    sections: ["Graph Neural Networks", "State Space Models", "LLM Agents", "Multimodal Foundation Models", "Open Questions"],
  },
];

export const levels: Level[] = [
  {
    id: "explorer",
    name: "Explorer",
    label: "Level 1",
    target: "Middle school student — zero prior knowledge, no math required.",
    summary: "Everyday analogies, visual intuition, and small games that build a real mental model of AI.",
    price: 0,
    priceLabel: "Free",
    access: "free",
    accent: "teal",
    modules: explorerModules,
  },
  {
    id: "engineer",
    name: "Engineer",
    label: "Level 2",
    target: "High school student — comfortable with basic algebra and functions.",
    summary: "Intuition-first mechanical understanding with graphs, functions, and honest light math.",
    price: 2,
    priceLabel: "€2 planned tier",
    access: "locked_future",
    accent: "gold",
    modules: engineerModules,
  },
  {
    id: "researcher",
    name: "Researcher",
    label: "Level 3",
    target: "University CS/AI student — comfortable with calculus, linear algebra, and probability.",
    summary: "Architecture-level depth, derivations, and research-frontier context.",
    price: 5,
    priceLabel: "€5 planned tier",
    access: "locked_future",
    accent: "coral",
    modules: researcherModules,
  },
];

export const totalModuleCount = levels.reduce((sum, level) => sum + level.modules.length, 0);

export function getLevel(levelId: string) {
  return levels.find((level) => level.id === levelId);
}

export function getModule(levelId: string, moduleId: string) {
  const level = getLevel(levelId);
  return {
    level,
    module: level?.modules.find((item) => item.id === moduleId),
  };
}
