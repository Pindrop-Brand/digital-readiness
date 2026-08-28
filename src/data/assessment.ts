import type { Pillar, ContextQuestion, Question } from '../types';

export const PILLARS: Pillar[] = [
  {
    id: 'P1',
    name: 'Budget and ownership',
    weight: 0.35,
    color: '#140700',
    meaning: 'Does someone own this problem, with real money behind it?',
    questions: [
      {
        id: '1.1',
        stem: "How has your organization's leadership prioritized defending against AI-driven attacks?",
        max: 3,
        reverse: false,
        opts: [
          "Our leadership hasn't prioritized this at all.",
          'Our leadership agrees it is a priority, but hasn\'t increased investment in it.',
          "Our leadership has increased investment, but doesn't plan to increase it more.",
          'Our leadership has increased investment and plans to increase it more.',
        ],
      },
      {
        id: '1.2',
        stem: 'How strongly do you agree: “My organization has increased investment in cybersecurity tools to address AI-driven threats, but has not added headcount to manage them.”',
        max: 3,
        reverse: false,
        opts: [
          'Strongly agree.',
          'Somewhat agree.',
          'Somewhat disagree.',
          'Strongly disagree.',
        ],
      },
      {
        id: '1.3',
        stem: 'How much has your organization prioritized detecting and combatting deepfake attacks compared to other emerging AI-powered attacks?',
        max: 3,
        reverse: false,
        opts: [
          "We're not prioritizing AI-powered attacks at all.",
          'We are prioritizing other AI-powered attacks over deepfake attacks.',
          'We are prioritizing all types of AI-powered attacks equally.',
          'We are prioritizing deepfake attacks above other AI-powered attacks.',
        ],
      },
    ],
  },
  {
    id: 'P2',
    name: 'Tools and detection',
    weight: 0.35,
    color: '#FF5100',
    meaning: 'Do you have technology that catches synthetic voice and video?',
    questions: [
      {
        id: '2.1',
        stem: 'Right now, what tools are you using to combat deepfake identity attacks?',
        max: 4,
        reverse: false,
        opts: [
          "We don't have any tools to combat deepfake identity attacks.",
          'We are using our legacy security tools to help combat deepfake attacks.',
          'We are using homegrown tools or have adapted our own tools.',
          'We invested in broader tools that help combat deepfake attacks.',
          'We invested in tools specifically designed to combat deepfake attacks.',
        ],
      },
      {
        id: '2.2',
        stem: 'How much of a return on investment has your organization seen from the tools you use to combat deepfake identity attacks?',
        max: 2,
        reverse: false,
        opts: ['Negative return.', 'Small to no positive return.', 'Strong positive return.'],
        naLabel: 'We haven\'t evaluated the ROI on our investment or not applicable.',
      },
    ],
  },
  {
    id: 'P3',
    name: 'People and training',
    weight: 0.30,
    color: '#2E8A93',
    meaning: 'Can your employees identify an attack and escalate it?',
    questions: [
      {
        id: '3.2',
        stem: 'How strongly do you agree: “It will take a leader at my organization being personally fooled or impersonated by a deepfake for them to take this threat as seriously as they should.”',
        max: 3,
        reverse: false,
        opts: [
          'Strongly agree.',
          'Somewhat agree.',
          'Somewhat disagree.',
          'Strongly disagree.',
        ],
      },
    ],
  },
];

export const CONTEXT_Q: ContextQuestion[] = [
  {
    id: 'c1',
    short: 'Encountered a deepfake attack',
    stem: 'Has your organization encountered a deepfake attack in the past 12 months?',
    opts: [
      "No, we definitely haven't.",
      "We may have but I'm not sure.",
      'Yes, we probably have.',
      'Yes, we definitely have.',
    ],
    bench: {
      "No, we definitely haven't.": 16.0,
      "We may have but I'm not sure.": 9.6,
      'Yes, we probably have.': 47.2,
      'Yes, we definitely have.': 27.2,
    },
  },
  {
    id: 'c2',
    short: 'A single attack could end the company',
    stem: 'How likely is it that damage from a single deepfake attack could cause a company like yours to go out of business?',
    opts: [
      'Not at all likely.',
      'Not too likely.',
      'Somewhat likely.',
      'Extremely likely.',
      'Definitely will happen.',
    ],
    bench: {
      'Not at all likely.': 22.8,
      'Not too likely.': 40.0,
      'Somewhat likely.': 20.0,
      'Extremely likely.': 16.8,
      'Definitely will happen.': 0.4,
    },
  },
  {
    id: 'c3',
    short: 'Consequences from a deepfake attack',
    stem: 'Which consequences has your organization experienced or suspects from a deepfake attack?',
    multi: true,
    opts: [
      'Follow-up cyberattacks (e.g., ransomware)',
      'Compliance risk',
      'Data breach',
      'Loss of business revenue',
      'Exposure of sensitive data',
      'Stolen assets or funds',
      'Loss of corporate reputation or consumer trust',
      'None of these',
    ],
    bench: {
      'Follow-up cyberattacks (e.g., ransomware)': 48.6,
      'Compliance risk': 43.3,
      'Data breach': 41.4,
      'Loss of business revenue': 37.6,
      'Exposure of sensitive data': 37.1,
      'Stolen assets or funds': 32.9,
      'Loss of corporate reputation or consumer trust': 31.9,
      'None of these': 1.4,
    },
  },
  {
    id: 'c4',
    short: 'Cost of the attack(s)',
    stem: 'Approximately how much did the deepfake attack(s) you experienced or suspect cost in total?',
    opts: [
      'Less than $50,000',
      '$50,000–$249,999',
      '$250,000–$499,999',
      '$500,000–$999,999',
      '$1M–$1.9M',
      '$2M–$4.9M',
      '$5 million or more',
    ],
    bench: {
      'Less than $50,000': 9.5,
      '$50,000–$249,999': 17.6,
      '$250,000–$499,999': 25.7,
      '$500,000–$999,999': 22.4,
      '$1M–$1.9M': 20.5,
      '$2M–$4.9M': 4.3,
      '$5 million or more': 0.0,
    },
  },
  {
    id: 'c5',
    short: 'Type of deepfake encountered',
    stem: 'Which of the following deepfakes do you know or suspect your company encountered?',
    multi: true,
    opts: [
      'Phishing with a deepfake follow-up',
      'Executive voice/audio spoofing',
      'IT/helpdesk',
      'Customer/call center',
      'Vendor or consultant',
      'Fabricated corporate video/post',
      'Video meetings',
      'Job candidates',
    ],
    bench: {
      'Phishing with a deepfake follow-up': 50.5,
      'Executive voice/audio spoofing': 45.7,
      'IT/helpdesk': 45.2,
      'Customer/call center': 36.7,
      'Vendor or consultant': 32.4,
      'Fabricated corporate video/post': 27.6,
      'Video meetings': 26.2,
      'Job candidates': 22.4,
    },
  },
  {
    id: 'c6',
    short: 'Workforce could identify a deepfake',
    stem: "What percentage of your company's workforce do you believe could identify a deepfake attack — such as a fake customer, vendor, or someone impersonating a company leader? Your best guess is fine.",
    opts: [
      '0%–10%.',
      '11%–20%.',
      '21%–30%.',
      '30%–40%.',
      '41%–50%.',
      'More than 50%.',
    ],
    bench: {
      '0%–10%.': 27.6,
      '11%–20%.': 17.6,
      '21%–30%.': 17.2,
      '30%–40%.': 15.6,
      '41%–50%.': 4.8,
      'More than 50%.': 17.2,
    },
  },
];

export type TierName = 'Exposed' | 'Reactive' | 'Prepared';

export function getTier(composite: number): [TierName, string] {
  if (composite < 40) return ['Exposed', '#FF5100'];
  if (composite < 70) return ['Reactive', '#B0E7EB'];
  return ['Prepared', '#F0FF91'];
}

export const TAGLINE: Record<TierName, string> = {
  Exposed: 'Minimal defense against a threat already inside most enterprises.',
  Reactive: 'Investing, but coverage is uneven. Most organizations sit here today.',
  Prepared: 'Leadership, tooling, and workforce are all in place. Keep testing.',
};

export const REC_BY_PILLAR: Record<string, string> = {
  'Budget and ownership':
    'Name an executive owner for deepfake defense and attach a specific budget line to it. Educate your leadership team on the risks and potential fallout, including which channels are riskiest. Real ownership and real money are often the first steps to addressing the problem.',
  'Tools and detection':
    "Evaluate a deepfake-specific detection tool rather than relying on legacy security software or homegrown tools. Pilot it against your highest-risk channel (for some, that’s the IT helpdesk, hiring, or the contact center), and start measuring how many deepfakes you’re catching.",
  'People and training':
    "Prioritize adoption: make sure your people actually know how to use the detection tools you’ve already invested in. Run hands-on training this quarter on your existing tools, including the exact steps to flag and escalate a suspected deepfake.",
};

export interface Page {
  kind: 'pillar' | 'context-all';
  pillar?: Pillar;
  question?: Question;
}

export function buildPages(): Page[] {
  const pages: Page[] = [];
  for (const p of PILLARS) {
    for (const q of p.questions) {
      pages.push({ kind: 'pillar', pillar: p, question: q });
    }
  }
  pages.push({ kind: 'context-all' });
  return pages;
}

export function pillarNorm(
  p: Pillar,
  answers: Record<string, number | 'NA' | null>,
): number | null {
  let sum = 0;
  let max = 0;
  for (const q of p.questions) {
    const a = answers[q.id];
    if (a == null || a === 'NA') continue;
    sum += q.reverse ? q.max - a : a;
    max += q.max;
  }
  return max > 0 ? (sum / max) * 100 : null;
}

export function fullComposite(answers: Record<string, number | 'NA' | null>): number {
  let c = 0;
  for (const p of PILLARS) {
    const norm = pillarNorm(p, answers);
    if (norm != null) c += norm * p.weight;
  }
  return c;
}

export function pageIsComplete(
  page: Page,
  answers: Record<string, number | 'NA' | null>,
): boolean {
  if (page.kind === 'pillar' && page.question) {
    return answers[page.question.id] != null;
  }
  return true;
}
